import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { WebsocketService } from './websocket.service';

@Injectable({ providedIn: 'root' })
export class GameService {
  game: Subject<any>;
  colorOdd;
  colorEven;
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
