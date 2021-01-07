import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/shared/services/websocket.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  constructor(private _wsService: WebsocketService) { }

  ngOnInit() {
  }

  function(){
    this._wsService.createLobbyNamespace()
  }
}
