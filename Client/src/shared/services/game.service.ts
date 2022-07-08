import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IHashBoolean } from '../models/hash';

@Injectable({ providedIn: 'root' })
export class GameService {
  game: Subject<any>;
  colorOdd = '';
  colorEven = '';
  pageBackgroundColor = '';
  isMouseUp = true;

  buttonHash: IHashBoolean = {
    lobbyNewGame: false,
  };
  // constructor(private _websocketService: WebsocketService) {
  //     this.game = <Subject<any>>_websocketService
  //         .connect().pipe(map((response: any): any => {
  //             return response
  //         }))
  // }

  // sendGame(game) {
  //     this.game.next(game);
  // }
}
