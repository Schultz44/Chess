import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ActivePiece, EnumPieceAction } from 'src/shared/logic/active-piece';
import { GameLogic } from 'src/shared/logic/game-logic';
import { Minimax } from "src/shared/logic/minimax";
import { Game } from "src/shared/models/board";
import { Piece, PieceColor, } from 'src/shared/models/piece';
import { Player } from 'src/shared/models/player';
import { GameStateService } from "src/shared/services/game-state.service";
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
    constructor(
        private _gameService: GameService,
        private _webSocketService: WebsocketService,
        private _gameStateService: GameStateService,
        private Router: Router
    ) { }
    checked;
    // public board = new BoardModel();
    // private activePiece: ActivePiece
    public gameLogic = new GameLogic();
    cachedPiece: Piece;
    previousPieceLocation: { y, x }

    public get currentPlayer(): Player {
        return this._gameStateService.currentPlayer;
    }
    public get player1(): Player {
        return this._gameStateService.game.room.player1;
    }
    public get player2(): Player {
        return this._gameStateService.game.room.player2;
    }
    public get game(): Game {
        return this._gameStateService.game
    }


    ngOnInit() {
        if (this.Router.url.includes('ai')) {
            this._gameStateService.isAI = true;
            if (!this._gameStateService.currentPlayer) {
                this._gameStateService.currentPlayer = new Player({ playerName: 'Human', turn: true, color: PieceColor.white })
            }
        }
        // this.ActivatedRoute.snapshot
        // this._webSocketService.
        //     joinRoom(
        //         JSON.parse(localStorage.getItem('user')),
        //         JSON.parse(localStorage.getItem('roomName')))
        //     .then(() => {
        this.Create();
        // })
    }
    Create() {
        for (let i = 0; i < 8; i++) {
            this.game.board[i] = new Array<null>()
            for (let j = 0; j < 8; j++) {
                this.game.board[i][j] = null
            }
        }
        this.gameLogic.NewGame(this.game.board)
    }
    clickedSquare(square: Piece, y?, x?) {
        if (this.currentPlayer.turn && square !== null) {
            if (!square?.defenseless && this.currentPlayer.color == square?.color) {
                this.cachedPiece = square
                ClearOpenSquares(this.game.board)
                new ActivePiece(this.game.board).ShowSquares(square, EnumPieceAction.show);
                this.previousPieceLocation = { y: square.y, x: square.x }
            }
            if (square?.defenseless || (square === undefined && this.cachedPiece)) {
                // Moves the cachePiece
                new ActivePiece(this.game.board).ShowSquares(this.cachedPiece, EnumPieceAction.move, y, x)
                this.checked = new ActivePiece(this.game.board).isKingInCheck(this.currentPlayer.color, this.currentPlayer);
                this._gameStateService.changePlayersTurn()
                if (this._gameStateService.isAI) {
                    Minimax(this._gameStateService.game.board)
                }
                else {
                    this._webSocketService.emitLobby('Played Piece',
                        { piece: this.cachedPiece, room: this.game.room, previousPieceLocation: this.previousPieceLocation }
                    )
                    this.currentPlayer.turn = false
                }
                this.cachedPiece = undefined;
            }
        }
        else {
            ClearOpenSquares(this.game.board)
        }

    }
    test(){
        this._webSocketService.listen('Created Room').subscribe(console.log)
    }
    
    l() {
        let table = { Player1: undefined, Player2: undefined, CurrentPlayer: undefined }
        table.Player1 = this.player1
        table.Player2 = this.player2
        table.CurrentPlayer = this.currentPlayer
        console.table(table)
        console.table(this.game.board)
    }
    leaveRoom(){
        this._webSocketService.leaveRoom(this.currentPlayer)
    }
    checkUsers() {
        this._webSocketService.emitLobby('Game Users', this.game);
    }
}
