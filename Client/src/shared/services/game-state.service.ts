import { Injectable } from '@angular/core';
import { Game } from '../models/board';
import { Player } from '../models/player';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  currentPlayer: Player;
  rooms: Room[] = [];
  game = new Game();
  isAI = false;
  constructor() { }
  changePlayersTurn() {
    if (this.currentPlayer.color == this.game.room.player1.color && this.currentPlayer.turn) {
      this.game.room.player1.turn = false
      this.game.room.player2.turn = true
    }
    else if (this.currentPlayer.color == this.game.room.player2.color && this.currentPlayer.turn) {
      this.game.room.player2.turn = false;
      this.game.room.player1.turn = true
    }
  }
}
