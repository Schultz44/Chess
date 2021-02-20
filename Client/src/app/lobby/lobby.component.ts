import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PieceColor } from 'src/shared/models/piece';
import { Player } from 'src/shared/models/player';
import { Room } from 'src/shared/models/room';
import { WebsocketService } from 'src/shared/services/websocket.service';
import { generateRandomstring } from 'src/shared/utilities/generateRandomString';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  username: string = 'User 1';
  lobbyName: string = 'Room 1';
  // currentRoom;
  // rooms: Room[] = [];
  get rooms() {
    return this._wsService.rooms
  }
  constructor(private _wsService: WebsocketService, private router: Router) { }

  ngOnInit() {
    this._wsService.createLobbyNamespace()
    //Figure out how to get updated data from wsService
    this._wsService.rooms.forEach(room => {
      console.log(room);
      this.rooms.push(new Room({ roomName: room.roomName, player1: room.player1, player2: room.player2 }))
    })
  }

  function() { }
  showRooms() {
    this._wsService.getRooms()
  }
  leaveRooms() {
    this._wsService.leaveRooms();
  }
  leaveRoom() {
    this._wsService.leaveRoom()
  }

  createRoom = (): void => {
    // const r = await this._wsService.createRoom(this.username, this.lobbyName);
    const user = new Player({playerName : this.username, turn : true, color : PieceColor.white})
    this._wsService.createRoom(user, this.lobbyName).then(() => {
      // this.currentRoom = this._wsService.currentRoom;
      // console.log(this.currentRoom);
      this.router.navigate([`./game/${this._wsService.game.room.roomKey}`]);
    })
  }

  joinRoom(room: Room){
    const user = new Player({playerName: this.username, turn: false, color: PieceColor.black})
    console.log(user);
    
    this._wsService.joinRoom(user, room).then(() => {
      this.router.navigate([`./game/${this._wsService.game.room.roomKey}`]);
    })
  }
}
