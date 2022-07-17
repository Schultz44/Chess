import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
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
  connectError: string;
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
    // console.log(JSON.stringify(user));
    console.log(user);
    this.lobbySocket.emit('leaveRoom', user);
  }
  private $validateRoomName(): Observable<boolean> {
    const results = new Observable<boolean>((observer) => {
      this.lobbySocket.on('isRoomNameValid', (message) => {
        if (message) {
          this._toasterService.showError(message);
        }
        this.lobbySocket.off('isRoomNameValid');
        observer.next(message ? false : true);
        observer.complete();
      });
    });
    return results;
  }
  $createdRoom(): Observable<void> {
    return new Observable<void>((observer) => {
      this.lobbySocket.on('createdRoom', (data: Room) => {
        console.log(data);
        this._gameStateService.game.room = data;
        this.lobbySocket.off('createdRoom');
        observer.next();
        observer.complete();
      });
    });
    // return result;
  }
  /**
   * @param user
   * @param roomName
   * @returns Promise<boolean>
   * Connects to the createRoom socket.
   * Sets the _gameStateService.game.room object if valid room name
   */
  // async createRoom(user: Player, roomName: string): Promise<boolean> {
  //   const results = new Promise<boolean>((resolve) => {
  //     this.lobbySocket.emit(
  //       'createRoom',
  //       new Room({
  //         player1: user,
  //         roomName: roomName,
  //         roomKey: generateRandomstring(8),
  //       })
  //     );
  //     this.$validateRoomName().subscribe((valid) => {
  //       if (valid) {
  //         console.log(valid);

  //         this.$createdRoom().subscribe(
  //           () => {
  //             console.log('CREATED ROOM');
  //             resolve(true);
  //           },
  //           () => resolve(false)
  //         );
  //       } else resolve(false);
  //     });
  //   });
  //   return await results;
  // }
  /**
   * @param user
   * @param roomName
   * @returns Observable<boolean>
   * Connects to the createRoom socket.
   * Sets the _gameStateService.game.room object if valid room name
   */
  $createRoom(user: Player, roomName: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.lobbySocket.emit(
        'createRoom',
        new Room({
          player1: user,
          roomName: roomName,
          roomKey: generateRandomstring(8),
        })
      );
      this.$validateRoomName().subscribe((valid) => {
        console.log(valid);

        if (valid) {
          this.$createdRoom().subscribe(
            () => {
              observer.next(true);
              observer.complete();
            },
            () => {
              observer.next(false);
              observer.complete();
            }
          );
        } else {
          observer.next(false);
          observer.complete();
        }
      });
    });
    // return results;
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
    // console.log(this.lobbySocket);
    this.lobbySocket.on('connection', () => console.log('123'));

    this.lobbySocket.on('Available Rooms', (data) => {
      this._gameStateService.rooms = data;
      // console.log(data);
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
