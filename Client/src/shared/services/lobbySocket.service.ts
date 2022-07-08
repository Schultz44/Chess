import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { ToasterService } from '../components/toasters/toaster.service';
import { Piece } from '../models/piece';
import { Player } from '../models/player';
import { Room } from '../models/room';
import { generateRandomstring } from '../utilities/generateRandomString';
import { GameStateService } from './game-state.service';

@Injectable({
  providedIn: 'root',
})
export class LobbySocketService {
  private lobbySocket: Socket;
  connectError: any;
  constructor(
    private _gameStateService: GameStateService,
    private _toasterService: ToasterService
  ) {
    this._gameStateService = _gameStateService;
  }
  getRooms(): void {
    this.lobbySocket.emit('log rooms', {});
  }
  leaveRooms(): void {
    this.lobbySocket.emit('reset all rooms', {});
  }
  leaveRoom(user: Player): void {
    console.log(JSON.stringify(user));
    this.lobbySocket.emit('leave room', user);
  }
  private async validateRoomName(): Promise<boolean> {
    const results = new Promise<boolean>((resolve) => {
      this.lobbySocket.on('isRoomNameValid', (message) => {
        this._toasterService.showError(message);
        this.lobbySocket.off('isRoomNameValid');
        resolve(false);
      });
      resolve(true);
    });
    return await results;
  }
  async createdRoom(): Promise<void> {
    const result = new Promise<void>((resolve) => {
      this.lobbySocket.on('createdRoom', (data: Room) => {
        console.log('CREATED ROOM :: ', data);
        this.lobbySocket.off('createdRoom');
        resolve();
      });
    });
    return await result;
  }
  async createRoom(user: Player, roomName: string): Promise<void> {
    const results = new Promise<void>((resolve) => {
      this.lobbySocket.emit(
        'Create Room',
        new Room({
          player1: user,
          roomName: roomName,
          roomKey: generateRandomstring(8),
        })
      );
      this.validateRoomName().then((valid) => {
        if (valid) {
          this.createdRoom().then(() => {
            resolve();
          });
        } else resolve();
        // resolve();
      });
    });
    await results;
  }
  listenLobby(eventName: string): Observable<unknown> {
    return new Observable((subscriber) => {
      this.lobbySocket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }
  emitLobby(eventName: string, data: unknown): void {
    this.lobbySocket.emit(eventName, data);
  }
  async joinRoom(user: Player, room: Room): Promise<void> {
    const results = new Promise<void>((resolve) => {
      // room.users.push(user);
      room.player2 = user;
      this.lobbySocket.emit('Join Room', { room });
      // console.log(room);
      // console.log('------------------------------');

      this._gameStateService.game.room = room;

      resolve();
    });
    await results;
  }
  createLobbyNamespace(): void {
    // if (this.lobbySocket) {
    //     this.lobbySocket.close()
    // }
    // this.lobbySocket.auth = {t:'Hello'}
    this.lobbySocket = io(environment.SOCKET_ENDPOINT + '/lobby');
    this.lobbySocket.auth = [this.connectError];
    this.lobbySocket.connect();
    console.log(this.lobbySocket);
    this.lobbySocket.on('connection', () => console.log('123'));

    this.lobbySocket.on('Available Rooms', (data) => {
      this._gameStateService.rooms = data;
      console.log(data);
    });
    // This is placed here because the other users connected to the lobby arent connected to the room to see the existing rooms
    this.lobbySocket.on('Room Events', (data) => {
      this._gameStateService.rooms.push(data);
      console.log('ROOM EVENTS');

      console.log(this._gameStateService.rooms);
    });

    this.lobbySocket.on('Emit Opponent', (data: Room) => {
      this._gameStateService.game.room.player2 = data.player2;
      console.log(this._gameStateService.game.room.player2);
    });

    this.lobbySocket.on(
      'Update Board State',
      (data: { piece: Piece; room: Room; previousPieceLocation: { x; y } }) => {
        console.log(data);
        this._gameStateService.game.room = data.room;
        this._gameStateService.game.board[data.piece.y][data.piece.x] =
          data.piece;
        this._gameStateService.game.board[data.previousPieceLocation.y][
          data.previousPieceLocation.x
        ] = null;
        if (
          data.room.player2.color == this._gameStateService.currentPlayer.color
        ) {
          this._gameStateService.currentPlayer = data.room.player2;
        } else this._gameStateService.currentPlayer = data.room.player1;
        // if (data.room.player2.turn) {
        //     this._gameStateService.currentPlayer = data.room.player2
        // }
        // else this._gameStateService.currentPlayer = data.room.player1;
        // this._gameStateService.changePlayersTurn();
      }
    );
    this.lobbySocket.on('Game Users', (data) => {
      console.log(data);
    });
  }
}
