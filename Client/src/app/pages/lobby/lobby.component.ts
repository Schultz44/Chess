import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PieceColor } from 'src/shared/models/piece';
import { Player } from 'src/shared/models/player';
import { Room } from 'src/shared/models/room';
import { AuthService } from 'src/shared/services/auth.service';
import { GameStateService } from 'src/shared/services/game-state.service';
import { GameService } from 'src/shared/services/game.service';
import { LobbySocketService } from 'src/shared/services/lobbySocket.service';
import { UserStateService } from 'src/shared/services/user-state.service';
import { WebsocketService } from 'src/shared/services/websocket.service';

@Component({
    selector: 'app-lobby',
    templateUrl: './lobby.component.html',
    styleUrls: ['./lobby.component.scss'],
    standalone: false
})
export class LobbyComponent implements OnInit {
  // username: string = 'User 1';
  username;
  roomName = '';
  hasUserName: boolean;

  // currentRoom;
  // rooms: Room[] = [];
  gameService: GameService;
  isClickPlay = false;
  inGame: boolean;
  get rooms(): Room[] {
    return this._gameStateService.rooms;
  }
  constructor(
    private _wsService: WebsocketService,
    private router: Router,
    private _gameStateService: GameStateService,
    private _userStateService: UserStateService,
    private _gameService: GameService,
    private _lobbySocketService: LobbySocketService,
    private _authService: AuthService
  ) {
    this.router = router;
    // this._userStateService = _userStateService;
    // this._gameStateService = _gameStateService;
    // this._wsService = _wsService;
    // this._lobbySocketService = _lobbySocketService;
    this.gameService = _gameService;
    // console.log(this.gameService);

    // console.log(this._userStateService.user);
    this.username = _userStateService.user.username;

    // this._wsService.connected$.subscribe(bool => {
    //     this.hasUserName = bool
    //     if (!bool) {
    //       console.log(this._wsService);

    //       this.invalidUsernameError = this._wsService.connectError
    //     } else {
    //       this.invalidUsernameError = '';
    //       this.joinLobby()
    //     }
    // })
  }
  ngOnInit(): void {
    if (this._userStateService.user.username) {
      this.joinLobby();
      // this.hasUserName = true;
      this.username = this._userStateService.user.username;
    } else this.router.navigate(['/login']);
  }
  joinLobby(): void {
    this._lobbySocketService.createLobbyNamespace();
    //Figure out how to get updated data from wsService
    this._gameStateService.rooms.forEach((room) => {
      console.log(room);
      this.rooms.push(
        new Room({
          roomName: room.roomName,
          player1: room.player1,
          player2: room.player2,
        })
      );
    });
  }
  // function() { }
  showRooms(): void {
    this._lobbySocketService.getRooms();
  }
  leaveRooms(): void {
    this._lobbySocketService.leaveRooms();
  }
  // leaveRoom() {
  //   this._wsService.leaveRoom()
  // }
  // $signOut(): Observable<boolean> {
  signOut() {
    // return new Observable<boolean>((observer) => {
    //   // this._wsService.connect();
    //   // this._wsService.emit('t', 'TEST WORKS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    // });
    this._authService.signOutUser();
    // this._lobbySocketService.emitLobby('log_rooms', (data) => {
    //   console.log(data);
    // });
  }
  createRoom = (): void => {
    // const r = await this._wsService.createRoom(this.username, this.roomName);
    const user = new Player({
      playerName: this.username,
      turn: true,
      color: PieceColor.white,
    });
    // localStorage.setItem('user', JSON.stringify(user));
    // localStorage.setItem('roomName', this.roomName);

    this._lobbySocketService
      .$createRoom(user, this.roomName)
      .subscribe((isCreated) => {
        // this.currentRoom = this._wsService.currentRoom;
        // console.log(this.currentRoom);
        console.log(
          'last:: :: :: :: ',
          this._gameStateService.game.room.player1
        );

        if (this._gameStateService.currentPlayer === undefined) {
          this._gameStateService.currentPlayer =
            this._gameStateService.game.room.player1;
        }

        if (isCreated) {
          console.log(this._gameStateService.game);
          this.inGame = true;
          this.router.navigate([
            `./game/${this._gameStateService.game.room.roomKey}`,
          ]);
        }
      });
    // subscription.unsubscribe();
  };

  joinRoom(room: Room): void {
    const user = new Player({
      playerName: this.username,
      turn: false,
      color: PieceColor.black,
    });
    // localStorage.setItem('user', JSON.stringify(user));
    // localStorage.setItem('room', JSON.stringify(room));
    this._lobbySocketService.joinRoom(user, room).then(() => {
      // console.log(JSON.parse(localStorage.getItem('user')),
      // JSON.parse(localStorage.getItem('room')));
      if (this._gameStateService.currentPlayer === undefined) {
        this._gameStateService.currentPlayer =
          this._gameStateService.game.room.player2;
      }
      this.router.navigate([
        `./game/${this._gameStateService.game.room.roomKey}`,
      ]);
    });
  }

  playAI(): void {
    this._gameStateService.currentPlayer = new Player({
      playerName: this.username,
      turn: true,
      color: PieceColor.white,
    });
    this._gameStateService.isAI = true;
    this.router.navigate(['./game/ai']);
  }
}
