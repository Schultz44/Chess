import { Component } from "@angular/core";
import { ActivePiece, EnumPieceAction } from 'src/shared/logic/active-piece';
import { GameLogic } from 'src/shared/logic/game-logic';
import { Game } from "src/shared/models/board";
import { Piece, PieceColor } from 'src/shared/models/piece';
import { Player } from 'src/shared/models/player';
import { Room } from "src/shared/models/room";
import { GameService } from 'src/shared/services/game.service';
import { WebsocketService } from "src/shared/services/websocket.service";
import { ClearOpenSquares } from 'src/shared/utilities/clearOpenSquares';

interface Board {
    Create();
}
@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent implements Board {
    constructor(private _gameService: GameService, private _webSocketService: WebsocketService) { }
    checked;
    // public board = new BoardModel();
    // private activePiece: ActivePiece
    public gameLogic = new GameLogic();
    cachedPiece: Piece;

    public get currentPlayer(): Player {
        return this._webSocketService.currentPlayer;
    }
    public get player1(): Player {
        return this._webSocketService.game.room.player1;
    }
    public get player2(): Player {
        return this._webSocketService.game.room.player2;
    }
    public get game(): Game{
        return this._webSocketService.game
    }
    ngOnInit() {
        this.Create();
        // this._gameService.game.subscribe(data => {
        //     console.log(data);

        // })
        // this.game.room = this._webSocketService.game.room;
    }
    sendBoard() {
        // this._gameService.sendGame(this.board);
    }
    Create() {
        for (let i = 0; i < 8; i++) {
            this.game.board[i] = new Array<null>()
            for (let j = 0; j < 8; j++) {
                this.game.board[i][j] = null
            }
        }
        this.gameLogic.NewGame(this.game.board)
        // this. = new ActivePiece(this.game.board);
        
    }
    clickedSquare(square: Piece, y?, x?) {
        // this.sendBoard()
        console.log(this.currentPlayer);
        console.log(square);
        console.log(this.currentPlayer.turn && square !== null);
        
        if (this.currentPlayer.turn && square !== null) {
            if (!square?.defenseless && this.currentPlayer.color == square?.color) {
                console.log('Caching the Piece');
                
                this.cachedPiece = square
                ClearOpenSquares(this.game.board)
                new ActivePiece(this.game.board).ShowSquares(square, EnumPieceAction.show);
            }

            if (square?.defenseless || (square === undefined && this.cachedPiece)) {
                console.log('-------------');
                
                new ActivePiece(this.game.board).ShowSquares(this.cachedPiece, EnumPieceAction.move, y, x)
                this.checked = new ActivePiece(this.game.board).isKingInCheck(this.currentPlayer.color, this.currentPlayer);
                this.changePlayersTurn()
                console.log(this.cachedPiece);
                this._webSocketService.emitLobby('Played Piece', {piece: this.cachedPiece, room: this.game.room})
                // this._webSocketService.emitLobby('Emit Board State', this.game);
                // this._webSocketService.listenLobby('Emit Opponent').subscribe(data => console.log(data))
                this.cachedPiece = undefined;
            }
            // this._webSocketService.listen('connection').subscribe(data => {
            //     console.log(data);
            //     console.log('hi');

            // })
            // this._webSocketService.emit('board', this.board)
            // console.log('yo');

            // this._webSocketService.emit('yo', 'yo')

        }
        else {
            ClearOpenSquares(this.game.board)
        }
        // console.log(this.board);

    }
    // getOtherColor(color: PieceColor): PieceColor {
    //     return color == PieceColor.black ? PieceColor.white : PieceColor.black
    // }
    // isPlayerActive(player: Player): boolean {
    //     if (this.game.currentPlayer.turn == this.game.player1.turn) {

    //     }
    //     return false
    // }
    changePlayersTurn() {
        if (this.player1.turn) {
            this.player1.turn = false
            this.player2.turn = true
        } else {
            this.player2.turn = false;
            this.player1.turn = true
        }
    }
    l() {
        let table = { Player1: undefined, Player2: undefined, CurrentPlayer: undefined }
        table.Player1 = this.player1
        table.Player2 = this.player2
        table.CurrentPlayer = this.currentPlayer
        console.table(table)
        // console.log(this.player1);
        // console.log(this.player2);
        // console.log(this.currentPlayer);

    }
}
