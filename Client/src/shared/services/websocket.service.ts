import { Injectable } from "@angular/core";
// import * as io from 'socket.io-client';
import { io, Socket } from 'socket.io-client';
import * as Rx from 'rxjs';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
// import { Observable } from 'rxjs/internal/Observable';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Subject } from 'rxjs/internal/Subject';
import { generateRandomstring } from "../utilities/generateRandomString";
import { Player } from "../models/player";
import { Room } from "../models/room";
import { Game } from "../models/board";
import { Piece, PieceColor } from "../models/piece";
import { GameStateService } from "./game-state.service";
import { UserStateService } from "./user-state.service";

@Injectable({ providedIn: 'root' })
export class WebsocketService {

    private socket: Socket; // socket that connects to our socket.io server
    private lobbySocket: Socket;
    connectError: string;
    connected$: Observable<boolean>
    private connectionSubject: Subject<boolean> = new Subject<boolean>();
    constructor(private _gameStateService: GameStateService, private _userStateService: UserStateService) {
        this.connected$ = this.connectionSubject.asObservable()
     }
    setupSocketConnection() {
        this.socket = io(environment.SOCKET_ENDPOINT, {autoConnect: false});
        this.socket.onAny((event, ...args) => {
            console.log(event, ...args)
        })
        this.socket.on('message', (data) => { console.log(data) })
        this.socket.on('board-object', (data) => {
            console.log(data);
        })
    }
    connectToSocket(username: string){
        this.connectError = undefined;
        this.socket.auth = {username}
        this._userStateService.user = {username}
        this.socket.connect()
        this.socket.on('invalid_username', (err) => {
            if (err) {
                this.connectError = err
                this.socket.disconnect()
                this.connectionSubject.next(false)
            }
            else{
                this.connectionSubject.next(true)
            }
        });
    }
    getRooms() {
        this.lobbySocket.emit('log rooms', {})
    }
    leaveRooms() {
        this.lobbySocket.emit('reset all rooms', {})
    }
    leaveRoom(user: Player) {
        this.lobbySocket.emit('leave room', user)
    }
    async createRoom(user: Player, roomName: string) {
        const results = new Promise<void>((resolve, reject) => {            
            this.lobbySocket.emit('Create Room', new Room({ player1: user, roomName: roomName, roomKey: generateRandomstring(8) }))
            this.lobbySocket.on('Created Room', (data: Room) => {
                this._gameStateService.game.room = new Room(data)                
                // console.log(this.game.room);
                resolve()
            })
        })
        await results
    }
    async joinRoom(user: Player, room: Room) {
        const results = new Promise<void>((resolve, reject) => {
            // room.users.push(user);
            room.player2 = user
            this.lobbySocket.emit('Join Room', { room });
            // console.log(room);
            // console.log('------------------------------');

            this._gameStateService.game.room = room;

            resolve();
        })
        await results
    }
    emitTurn() {
        // this.lobbySocket.emit()
    }
    createLobbyNamespace() {
        
        // if (this.lobbySocket) {
        //     this.lobbySocket.close()
        // }
        // this.lobbySocket.auth = {t:'Hello'}
        this.lobbySocket = io(environment.SOCKET_ENDPOINT + '/lobby')
        this.lobbySocket.auth = [this.connectError]
        this.lobbySocket.connect()
        console.log(this.lobbySocket);
        this.lobbySocket.on('connection',() => console.log('123'));
        
        this.lobbySocket.on('Available Rooms', data => {
            this._gameStateService.rooms = data
            console.log(data);
        })
        // This is placed here because the other users connected to the lobby arent connected to the room to see the existing rooms
        this.lobbySocket.on('Room Events', data => {
            this._gameStateService.rooms.push(data);
            console.log('ROOM EVENTS');
            
            console.log(this._gameStateService.rooms);
        })

        this.lobbySocket.on('Emit Opponent', (data: Room) => {
            this._gameStateService.game.room.player2 = data.player2;
            console.log(this._gameStateService.game.room.player2);

        })

        this.lobbySocket.on('Update Board State', (data: { piece: Piece, room: Room, previousPieceLocation: {x, y} }) => {
            console.log(data);
            this._gameStateService.game.room = data.room
            this._gameStateService.game.board[data.piece.y][data.piece.x] = data.piece
            this._gameStateService.game.board[data.previousPieceLocation.y][data.previousPieceLocation.x] = null;
            if (data.room.player2.color == this._gameStateService.currentPlayer.color) {
                this._gameStateService.currentPlayer = data.room.player2
            }
            else this._gameStateService.currentPlayer = data.room.player1;
            // if (data.room.player2.turn) {
            //     this._gameStateService.currentPlayer = data.room.player2
            // }
            // else this._gameStateService.currentPlayer = data.room.player1;
            // this._gameStateService.changePlayersTurn();
        })
        this.lobbySocket.on('Game Users', data => {
            console.log(data);
            
        })


    }
    // TODO
    // Make is so only 1 room can be created per connection
    // Only 2 connections can be in 1 room at a time
    // Setup a way to leave a room
    listen(eventName: string) {
        return new Observable((subscriber) => {
            this.socket.on(eventName, (data) => {
                subscriber.next(data)
            })
        })
    }

    listenLobby(eventName: string) {
        return new Observable((subscriber) => {
            this.lobbySocket.on(eventName, data => {
                subscriber.next(data)
            })
        })
    }
    emit(eventName: string, data: any) {
        this.socket.emit(eventName, data)
    }
    emitLobby(eventName: string, data: any) {
        this.lobbySocket.emit(eventName, data)
    }
    connect(): Rx.Subject<MessageEvent> {
        // this.socket = io(environment.ws_url);
        let observable = new Observable(observer => {
            this.socket.on('board object', data => {
                console.log('Message worked');
                observer.next(data)
            })
            return () => {
                this.socket.disconnect();
            }
        })

        let observer = {
            next: (data: Object) => {
                this.socket.emit('board object', JSON.stringify(data));
            }
        }
        // return Subject.create()
        // return new AnonymousSubject<MessageEvent>(observer, observable)
        return Rx.Subject.create(observer, observable)
    }
    ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.socket.off('connect_error')
    }
}