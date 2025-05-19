import { Component, HostListener, Injector } from '@angular/core';
import { createCustomElement, NgElementConstructor } from '@angular/elements';
import { ToasterComponent } from 'src/shared/components/toasters/toaster.component';
import { GameService } from 'src/shared/services/game.service';
import { WebsocketService } from 'src/shared/services/websocket.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  title = 'Chess';
  toasterElement: NgElementConstructor<unknown>;
  constructor(
    private _webSocketService: WebsocketService,
    private _gameService: GameService,
    private injector: Injector
  ) {
    this._webSocketService = _webSocketService;
    document.documentElement.style.setProperty('--even', '#6a322f');
    _gameService.colorEven = '#6a322f';
    document.documentElement.style.setProperty('--odd', '#b97430');
    _gameService.colorOdd = '#b97430';
    document.documentElement.style.setProperty(
      '--pageBackgroundColor',
      'burlywood'
    );
    _gameService.pageBackgroundColor = 'burlywood';

    this.toasterElement = createCustomElement(ToasterComponent, { injector });
    customElements.define('app-toaster', this.toasterElement);
  }
  ngOnInit(): void {
    this._webSocketService.setupSocketConnection();
    // this._webSocketService.emit('yo', 'yo')
  }

  @HostListener('mouseup')
  mouseUpEvent(): void {
    this._gameService.buttonHash['lobbyNewGame'] = false;
  }
  @HostListener('mousedown')
  mouseDownEvent(): void {
    this._gameService.isMouseUp = false;
  }
}
