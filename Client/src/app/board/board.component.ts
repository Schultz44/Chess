import { Component } from "@angular/core";
import { ActivePiece, EnumPieceAction } from 'src/shared/logic/active-player';
import { Game } from 'src/shared/logic/game-logic';
import { Piece, PieceColor } from 'src/shared/models/piece';
import { Player } from 'src/shared/models/player';
import { GameService } from 'src/shared/services/game.service';
import { WebsocketService } from "src/shared/services/websocket.service";
import { ClearOpenSquares } from 'src/shared/utilities/clearOpenSquares';

interface Board {
    Create();
}
export class BoardModel {
    public board: [Piece[], Piece[]] = [[], []];
}
@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent implements Board {
    constructor(private _gameService: GameService, private _webSocketService: WebsocketService) { }
    checked;
    public board = new BoardModel().board;
    private activePiece: ActivePiece
    public game = new Game();
    cachedPiece: Piece;
    ngOnInit() {
        this.Create();
        // this._gameService.game.subscribe(data => {
        //     console.log(data);

        // })
    }
    sendBoard() {
        // this._gameService.sendGame(this.board);
    }
    Create() {
        for (let i = 0; i < 8; i++) {
            this.board[i] = new Array<null>()
            for (let j = 0; j < 8; j++) {
                this.board[i][j] = null
            }
        }
        this.game.NewGame(this.board)
        this.activePiece = new ActivePiece(this.board);
    }
    clickedSquare(square: Piece, y?, x?) {
        this.sendBoard()
        if (square !== null) {
            if (!square?.defenseless && this.game.currentPlayer.color == square?.color) {
                this.cachedPiece = square
                ClearOpenSquares(this.board)
                this.activePiece.ShowSquares(square, EnumPieceAction.show);
            }

            if (square?.defenseless || square === undefined && this.cachedPiece) {
                this.activePiece.ShowSquares(this.cachedPiece, EnumPieceAction.move, y, x)
                this.game.changePlayersTurn()
                this.checked = this.activePiece.isKingInCheck(this.game.currentPlayer.color, this.game.currentPlayer);
                console.log(this.game.currentPlayer)
                this.cachedPiece = undefined;
            }
            // this._webSocketService.listen('connection').subscribe(data => {
            //     console.log(data);
            //     console.log('hi');

            // })
            this._webSocketService.emit('board', this.board)
            // console.log('yo');
            
            // this._webSocketService.emit('yo', 'yo')

        }
        else {
            ClearOpenSquares(this.board)
        }
        // console.log(this.board);

    }
    getOtherColor(color: PieceColor): PieceColor {
        return color == PieceColor.black ? PieceColor.white : PieceColor.black
    }
    isPlayerActive(player: Player): boolean {
        if (this.game.currentPlayer.turn == this.game.player1.turn) {

        }
        return false
    }
}
