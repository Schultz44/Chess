import { Injectable } from "@angular/core";
// import * as io from 'socket.io-client';
import { io, Socket } from 'socket.io-client';
import * as Rx from 'rxjs';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
// import { Observable } from 'rxjs/internal/Observable';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({ providedIn: 'root' })
export class WebsocketService {

    private socket: Socket; // socket that connects to our socket.io server
    private lobbySocket: Socket;
    rooms = [];
    currentRoom;
    constructor() { }
    setupSocketConnection() {
        this.socket = io(environment.SOCKET_ENDPOINT);
        this.socket.on('message', (data) => { console.log(data) })
        this.socket.on('board-object', (data) => {
            console.log(data);
        })

        // this.nsp = io('/admin')
        // this.nsp.on('hi', () => {console.log('Hello from namespace')});

        // console.log('-------------------------');
        // this.socket.on('yo',data => {
        //     console.log('yo');

        // });
        // this.socket.send('yo')
        // this.socket.emit('yo', 'yo');
        // this.socket.emit('my message', 'Hello there from Angular.');
        // this.socket.on('my broadcast', (data: string) => {
        //     console.log(data);
        // });
    }
    createRoom(user, room) {
        console.log(user);
        
        this.lobbySocket.emit('Create Room', { username: user, room: room })
        this.currentRoom = room;
        this.lobbySocket.on('Created Room', data => {
            console.log(data);
        })
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
            console.log(data);
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

    emit(eventName: string, data: any) {
        this.socket.emit(eventName, data)
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