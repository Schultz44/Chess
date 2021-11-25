import { Component, OnInit, ɵbypassSanitizationTrustStyle } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PieceColor } from 'src/shared/models/piece';
import { Player } from 'src/shared/models/player';
import { Room } from 'src/shared/models/room';
import { GameStateService } from 'src/shared/services/game-state.service';
import { UserStateService } from 'src/shared/services/user-state.service';
import { WebsocketService } from 'src/shared/services/websocket.service';
import { generateRandomstring } from 'src/shared/utilities/generateRandomString';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  username: string = 'User 1';
  roomName: string = 'Room 1';
  hasUserName: boolean;
  invalidUsernameError: string;
  // currentRoom;
  // rooms: Room[] = [];
  get rooms() {
    return this._gameStateService.rooms
  }
  constructor(
    private _wsService: WebsocketService, 
    private router: Router,
    private _gameStateService: GameStateService,
    private _userStateService: UserStateService
    ) { 
      this._wsService.connected$.subscribe(bool => {
          this.hasUserName = bool
          if (!bool) {
            console.log(this._wsService);
            
            this.invalidUsernameError = this._wsService.connectError
          } else {
            this.invalidUsernameError = '';
            this.joinLobby()
          }
      })
        
    }
  ngOnInit() {
    if(this._userStateService.user){
      this.hasUserName = true
      this.username = this._userStateService.user.username
    } 
  }
  joinLobby(){    
    this._wsService.createLobbyNamespace()
    //Figure out how to get updated data from wsService
    this._gameStateService.rooms.forEach(room => {
      console.log(room);
      this.rooms.push(new Room({ roomName: room.roomName, player1: room.player1, player2: room.player2 }))
    })
  }
  makeUser(){
    this._wsService.connectToSocket(this.username)
  }
  // function() { }
  showRooms() {
    this._wsService.getRooms()
  }
  leaveRooms() {
    this._wsService.leaveRooms();
  }
  // leaveRoom() {
  //   this._wsService.leaveRoom()
  // }

  createRoom = (): void => {
    // const r = await this._wsService.createRoom(this.username, this.roomName);
    const user = new Player({playerName : this.username, turn : true, color : PieceColor.white})
    // localStorage.setItem('user', JSON.stringify(user));
    // localStorage.setItem('roomName', this.roomName);
    this._wsService.createRoom(user, this.roomName).then(() => {
      // this.currentRoom = this._wsService.currentRoom;
      // console.log(this.currentRoom);
      if (this._gameStateService.currentPlayer === undefined) {
        this._gameStateService.currentPlayer = this._gameStateService.game.room.player1
    }
      this.router.navigate([`./game/${this._gameStateService.game.room.roomKey}`]);
    })
  }

  joinRoom(room: Room){
    const user = new Player({playerName: this.username, turn: false, color: PieceColor.black})
    // localStorage.setItem('user', JSON.stringify(user));
    // localStorage.setItem('room', JSON.stringify(room));
    this._wsService.joinRoom(user, room).then(() => {
      // console.log(JSON.parse(localStorage.getItem('user')),
      // JSON.parse(localStorage.getItem('room')));
      if (this._gameStateService.currentPlayer === undefined) {
        this._gameStateService.currentPlayer = this._gameStateService.game.room.player2
    }
      this.router.navigate([`./game/${this._gameStateService.game.room.roomKey}`]);
    })
  }

  playAI(){
    this._gameStateService.currentPlayer = new Player({playerName : this.username, turn : true, color : PieceColor.white})
    this._gameStateService.isAI = true;
    this.router.navigate(['./game/ai'])
  }
}
