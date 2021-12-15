import { Injectable } from '@angular/core';
import { ClientUser } from '../models/clientUser';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private _user = new ClientUser();
  public get user(): ClientUser {
    return this._user;
  }
  public set user(value: ClientUser) {
    this._user = value;
  }
}
