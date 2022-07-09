import { Injectable } from '@angular/core';
// import * as io from 'socket.io-client';
import { io, Socket } from 'socket.io-client';
import * as Rx from 'rxjs';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { Player } from '../models/player';
import { Room } from '../models/room';
import { GameStateService } from './game-state.service';
import { UserStateService } from './user-state.service';
import { ClientUser } from '../models/clientUser';

@Injectable({ providedIn: 'root' })
export class WebsocketService {
  private socket: Socket; // socket that connects to our socket.io server
  connectError: string;
  connected$: Observable<boolean>;
  private connectionSubject: Subject<boolean> = new Subject<boolean>();
  constructor(private _userStateService: UserStateService) {
    this._userStateService = _userStateService;
    this.connected$ = this.connectionSubject.asObservable();
  }
  setupSocketConnection(): void {
    this.socket = io(environment.SOCKET_ENDPOINT, { autoConnect: false });
    this.socket.onAny((event, ...args) => {
      console.log(event, ...args);
    });
    this.socket.on('message', (data) => {
      console.log(data);
    });
    this.socket.on('board-object', (data) => {
      console.log(data);
    });
  }
  connectUserToSocket(username: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.connectError = undefined;
      this.socket.auth = new ClientUser({ username: username });
      this._userStateService.user = new ClientUser({ username: username });
      this.socket.connect();
      this.socket.on('is_username_valid', (user) => {
        if (!user.valid) {
          this.connectError = user.err;
          this.socket.off();
          this.socket.disconnect();
          this.connectionSubject.next(false);
          resolve(false);
        } else {
          // this.socket.off();
          // this.socket.disconnect();
          this.connectionSubject.next(true);
          resolve(true);
        }
      });
    });
  }
  disconnectFromSocket(): void {
    this.socket.disconnect();
  }

  // TODO
  // Make is so only 1 room can be created per connection
  // Only 2 connections can be in 1 room at a time
  // Setup a way to leave a room
  listen(eventName: string): Observable<unknown> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: unknown): void {
    this.socket.emit(eventName, data);
  }

  connect(): Rx.Subject<MessageEvent> {
    // this.socket = io(environment.ws_url);
    const observable = new Observable((observer) => {
      this.socket.on('board object', (data) => {
        console.log('Message worked');
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    const observer = {
      next: (data: Record<string, unknown>) => {
        this.socket.emit('board object', JSON.stringify(data));
      },
    };
    // return Subject.create()
    // return new AnonymousSubject<MessageEvent>(observer, observable)
    return Rx.Subject.create(observer, observable);
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.socket.off('connect_error');
  }
}
