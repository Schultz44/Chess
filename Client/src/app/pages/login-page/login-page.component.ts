import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'src/shared/components/toasters/toaster.service';
import {
  BlackKing,
  BlackPond,
  BlackQueen,
} from 'src/shared/models/BuildPieces';
import { AuthService } from 'src/shared/services/auth.service';
import { GameStateService } from 'src/shared/services/game-state.service';
import { GameService } from 'src/shared/services/game.service';
import { UserStateService } from 'src/shared/services/user-state.service';
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
  // ErrorElement: NgElementConstructor<unknown>;
  // toasterElement: NgElementConstructor<unknown>;
  constructor(
    private _wsService: WebsocketService,
    private _gameStateService: GameStateService,
    private _userStateService: UserStateService,
    private Router: Router,
    private _gameService: GameService,
    private toasterService: ToasterService,
    private _authService: AuthService
  ) {
    this._gameStateService = _gameStateService;
    this._wsService = _wsService;
    this.Router = Router;
    this._gameService = _gameService;
    this._wsService.disconnectFromSocket();
    this._wsService.connected$.subscribe((bool) => {
      this.hasUserName = bool;
      if (!bool) {
        this.toasterService.showError(this._authService.connectionError);
      } else {
        this.invalidUsernameError = '';
        this.Router.navigate(['/lobby']);
      }
    });
    // this.guestName = 'Patrick';
    // this.createGuest();
  }

  /**
   * Makes a call to the server to check if name validations
   */
  createGuest(): void {
    /**
     * subscribe to the WebSocketService Subject to listen for the stream of data
     * connectionSubject.next() will trigger the below logic
     */
    this._authService.connectUserToSocket(this.guestName).subscribe(() => {
      null;
    });
  }

  addBtnAnimation(el: HTMLDivElement): void {
    el.classList.remove('flatten');
    el.classList.add('pop-out');
  }
  removeBtnAnimation(el: HTMLDivElement): void {
    el.classList.remove('pop-out');
    el.classList.add('flatten');
  }
}
