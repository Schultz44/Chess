import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  BlackKing,
  BlackPond,
  BlackQueen,
  WhitePond,
} from 'src/shared/models/BuildPieces';
import { GameStateService } from 'src/shared/services/game-state.service';
import { GameService } from 'src/shared/services/game.service';
import { WebsocketService } from 'src/shared/services/websocket.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  isGuest = true;
  username: string;
  guestName: string;
  invalidUsernameError: string;
  hasUserName: boolean;
  pond = new BlackPond();
  queen = new BlackQueen();
  king = new BlackKing();
  constructor(
    private _wsService: WebsocketService,
    private _gameStateService: GameStateService,
    private Router: Router,
    private _gameService: GameService
  ) {
    this._gameStateService = _gameStateService;
    this._wsService = _wsService;
    this.Router = Router;
    this._gameService = _gameService;
    this._wsService.disconnectFromSocket();
    this._wsService.connected$.subscribe((bool) => {
      this.hasUserName = bool;
      if (!bool) {
        console.log(this._wsService);
        this.invalidUsernameError = this._wsService.connectError;
      } else {
        this.invalidUsernameError = '';
        this.Router.navigate(['/lobby']);
        // this.joinLobby();
      }
    });
  }
  // joinLobby(): void {
  //   this._wsService.createLobbyNamespace();
  //   //Figure out how to get updated data from wsService
  //   this._gameStateService.rooms.forEach((room) => {
  //     console.log(room);
  //     this.rooms.push(
  //       new Room({
  //         roomName: room.roomName,
  //         player1: room.player1,
  //         player2: room.player2,
  //       })
  //     );
  //   });
  // }

  createGuest(): void {
    console.log(this.guestName);
    if (this.invalidUsernameError) {
      document
        .getElementById('error-message')
        .animate(
          [
            { transform: 'rotate(3deg) translateY(0) translateX(0)' },
            { transform: 'rotate(0deg) translateY(2px) translateX(-3px)' },
            { transform: 'rotate(-3deg) translateY(0) translateX(0)' },
            { transform: 'rotate(0deg) translateY(-2px) translateX(3px)' },
          ],
          { duration: 150, iterations: 5 }
        );
    } else this._wsService.connectToSocket(this.guestName);
  }

  addBtnAnimation(el: HTMLDivElement): void {
    el.classList.remove('flatten');
    el.classList.add('pop-out');
  }
  removeBtnAnimation(el: HTMLDivElement): void {
    el.classList.remove('pop-out');
    el.classList.add('flatten');
  }
  l(e) {
    console.log(e);
  }
}
