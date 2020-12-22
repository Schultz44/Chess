import { Injectable } from "@angular/core";
// import * as io from 'socket.io-client';
import { io } from 'socket.io-client';
import * as Rx from 'rxjs';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({ providedIn: 'root' })
export class WebsocketService {

    private socket; // socket that connects to our socket.io server

    constructor() {
        this.socket = io(environment.ws_url)
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
        console.log(io);

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