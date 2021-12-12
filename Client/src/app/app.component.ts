import { Component } from '@angular/core';
import { GameService } from 'src/shared/services/game.service';
import { WebsocketService } from 'src/shared/services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Chess';
  constructor(
    private _webSocketService: WebsocketService,
    private _gameService: GameService
  ) {
    this._webSocketService = _webSocketService;
    document.documentElement.style.setProperty('--even', '#6a322f');
    this._gameService.colorEven = '#6a322f';
    document.documentElement.style.setProperty('--odd', '#b97430');
    this._gameService.colorOdd = '#b97430';
  }
  ngOnInit(): void {
    this._webSocketService.setupSocketConnection();
    console.log('App Component ngOnInit()');

    // this._webSocketService.emit('yo', 'yo')
  }
}
