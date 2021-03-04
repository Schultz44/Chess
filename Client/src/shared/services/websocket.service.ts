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

@Injectable({ providedIn: 'root' })
export class WebsocketService {

    private socket: Socket; // socket that connects to our socket.io server
    private lobbySocket: Socket;
    rooms: Room[] = [];
    // currentRoom = new Room()
    // player1 = new Player();
    // player2: Player;
    currentPlayer: Player;
    game = new Game();
    constructor() { }
    setupSocketConnection() {
        this.socket = io(environment.SOCKET_ENDPOINT);
        this.socket.on('message', (data) => { console.log(data) })
        this.socket.on('board-object', (data) => {
            console.log(data);
        })
    }
    getRooms() {
        this.lobbySocket.emit('log rooms', {})
    }
    leaveRooms() {
        this.lobbySocket.emit('reset all rooms', {})
    }
    leaveRoom() {
        this.lobbySocket.emit('leave room', {})
    }
    async createRoom(user: Player, roomName: string) {
        const results = new Promise<void>((resolve, reject) => {
            this.lobbySocket.emit('Create Room', new Room({ player1: user, roomName: roomName, roomKey: generateRandomstring(8) }))
            this.lobbySocket.on('Created Room', (data: Room) => {
                this.game.room = new Room(data)
                if (this.currentPlayer === undefined) {
                    this.currentPlayer = this.game.room.player1
                }
                console.log(this.game.room);
                resolve()
            })
        })
        await results
    }
    async joinRoom(user: Player ,room: Room) {
        const results = new Promise<void>((resolve, reject) => {
            // room.users.push(user);
            room.player2 = user
            this.lobbySocket.emit('Join Room', { room });
            console.log(room);
            console.log('------------------------------');
            
            this.game.room = room;
            if (this.currentPlayer === undefined) {   
                this.currentPlayer = this.game.room.player2
            }
            resolve();
        })
        await results
    }
    // private _room: Room
    // set room(room: Room) {
    //     this._room = room;
    // }
    // get room(): Room {
    //     return new Room(this._room);
    // }
    emitTurn(){
        // this.lobbySocket.emit()
    }
    createLobbyNamespace() {
        if (this.lobbySocket) {
            this.lobbySocket.close()
        }
        this.lobbySocket = io(environment.SOCKET_ENDPOINT + '/lobby');
        this.lobbySocket.on('Available Rooms', data => {
            this.rooms = data
            console.log(data);
        })
        // This is placed here because the other users connected to the lobby arent connected to the room to see the existing rooms
        this.lobbySocket.on('Room Events', data => {
            this.rooms.push(data);
            console.log(this.rooms);
        })

        this.lobbySocket.on('Emit Opponent', (data: Room) => {
            this.game.room.player2 = data.player2;
            console.log(this.game.room.player2);
            
        })

        this.lobbySocket.on('Update Board State', (data: {piece: Piece, room: Room}) => {
            console.log(data.piece);
            this.game.board[data.piece.y][data.piece.x] = data.piece
            // console.log(this.game);
            if (this.currentPlayer.color == PieceColor.black) {
                this.currentPlayer = data.room.player2
            }
            else this.currentPlayer = data.room.player1
        })

        // TODO
        // Make is so only 1 room can be created per connection
        // Only 2 connections can be in 1 room at a time
        // Setup a way to leave a room







        // this.lobbySocket.on('join', (data) => {
        //     console.log(data);
        // })
        // this.lobbySocket.emit('leave', '')
        // this.lobbySocket.emit('Join Room', {room: 'room-1', username: 'User 1' })
        // this.lobbySocket.on('Joined', data => {console.log(data);
        // })
        // this.lobbySocket.on('connectToRoom', (data) => {
        //     console.log(data);
        // })
    }
    listen(eventName: string) {
        return new Observable((subscriber) => {
            this.socket.on(eventName, (data) => {
                subscriber.next(data)
            })
        })
    }

    listenLobby(eventName: string){
        return new Observable((subscriber) => {
            this.lobbySocket.on(eventName, data => {
                subscriber.next(data)
            })
        })
    }
    emit(eventName: string, data: any) {
        this.socket.emit(eventName, data)
    }
    emitLobby(eventName: string, data: any){
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
}