import { Component } from '@angular/core';
import { WebsocketService } from 'src/shared/services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Chess';
  constructor(private _webSocketService: WebsocketService){}
  ngOnInit(){
    this._webSocketService.setupSocketConnection();
    // this._webSocketService.emit('yo', 'yo')
  }
}
