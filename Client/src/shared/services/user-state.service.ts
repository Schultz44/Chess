import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  private _user;
  public get user() {
    return this._user;
  }
  public set user(value) {
    this._user = value;
  }
constructor() { }

}
