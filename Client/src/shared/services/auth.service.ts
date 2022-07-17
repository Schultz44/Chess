import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io-client';
import { ClientUser } from '../models/clientUser';
import { UserStateService } from './user-state.service';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  connectionError: string;
  constructor(
    private _userStateService: UserStateService,
    private _wsService: WebsocketService,
    private router: Router
  ) {}

  connectUserToSocket(username: string): Observable<boolean> {
    this.connectionError = undefined;
    this._wsService.auth = new ClientUser({
      username: username,
    });
    this._wsService.connect();
    return new Observable<boolean>((observer) => {
      this.$isUsernameValid().subscribe((valid) => {
        if (valid) {
          this._wsService.connectionSubject.observers.forEach((obs) =>
            obs.complete()
          );
        }
        observer.next(valid);
        observer.complete();
      });
    });
  }

  private $isUsernameValid(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this._wsService.listen('is_username_valid').subscribe((data: any) => {
        this._wsService.disconnectFromSocket();
        if (!data.valid) {
          this.connectionError = data.err;
          this._wsService.connectionSubject.next(false);
          observer.next(false);
          observer.complete();
        } else {
          this._userStateService.user = new ClientUser({
            username: data.user.username,
            id: data.user.userID,
          });
          this._wsService.connectionSubject.next(true);
          observer.next(true);
          observer.complete();
        }
      });
    });
  }

  signOutUser(): void {
    // this._wsService.listen('connection').subscribe(() => {
    // this._wsService.emit('test', (data) => {
    // console.log(data);
    // this._wsService.connect();
    // console.log(this._wsService.isConnected());

    this._wsService.disconnectFromSocket();

    // this._wsService.emit('signOut', null);
    // this._wsService.disconnectFromSocket();
    this.router.navigate(['./login']);
    // });
    // });
  }
}
