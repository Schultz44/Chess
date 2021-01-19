import { Component, OnInit } from '@angular/core';
import { Room } from 'src/shared/models/room';
import { WebsocketService } from 'src/shared/services/websocket.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  username: string = 'User 1';
  lobbyName: string = 'Room 1';
  currentRoom;
  rooms: Room[] = [];
  // get rooms(){
  //   return this._wsService.rooms
  // }
  constructor(private _wsService: WebsocketService) { }

  ngOnInit() {
    this._wsService.createLobbyNamespace()
    //Figure out how to get updated data from wsService
    this._wsService.rooms.forEach(room => {
      console.log(room);
      this.rooms.push(new Room({roomName: room.room, users: [room.user]}))
    })
  }

  function(){
  }

  generateRandomstring = (length: number): string => {
    let value = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890';
    for (let i = 0; i < length; i++) {
      value = value.concat(chars[Math.floor(Math.random() * chars.length)])
    }
    return value
  }
  createLobby(){
    // const hash = this.generateRandomstring(5);
    // console.log(hash);
    this._wsService.createRoom(this.username, this.lobbyName)
    // console.log(this._wsService);
    this.rooms.push(new Room({roomName: this.lobbyName, users: [this.username]}))
    console.log(this.rooms);
    
    this.currentRoom = this.lobbyName
  }
}
