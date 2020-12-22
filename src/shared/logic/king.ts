import { Piece, PieceColor } from '../models/piece';
import { CheckSqaureState } from '../utilities/checkSquareState';
// import { ActivePiece } from './active-player';
import { Game } from './game-logic';

export class King {
    private piece: Piece;
    private board: [Piece[], Piece[]];
    private game = new Game();
    constructor(private _piece: Piece, private _board: [Piece[], Piece[]]) {
        this.piece = _piece;
        this.board = _board
    }
    viewMovementOptions() {
        const _X = this.piece.x
        const _Y = this.piece.y
        const enemyColor = this.piece.color == PieceColor.black ? PieceColor.white : PieceColor.black
        CheckSqaureState(this.board, _Y, _X + 1, enemyColor)
        CheckSqaureState(this.board, _Y, _X - 1, enemyColor)
        if (this.board[_Y + 1]) {
            CheckSqaureState(this.board, _Y + 1, _X + 1, enemyColor)
            CheckSqaureState(this.board, _Y + 1, _X - 1, enemyColor)
            CheckSqaureState(this.board, _Y + 1, _X, enemyColor)
            CheckSqaureState(this.board, _Y + 1, _X, enemyColor)
        }
        if (this.board[_Y - 1]) {
            CheckSqaureState(this.board, _Y - 1, _X + 1, enemyColor)
            CheckSqaureState(this.board, _Y - 1, _X - 1, enemyColor)
            CheckSqaureState(this.board, _Y - 1, _X, enemyColor)
            CheckSqaureState(this.board, _Y - 1, _X, enemyColor)
        }
    }
    // checkForCastle() {
    //     let activePiece = new ActivePiece(this.board)
    //     switch (this.game.currentPlayer.color) {
    //         case PieceColor.black:
    //             if (activePiece.blackKing.hasMoved == false) {
    //                 if (this.board[0][0].hasMoved == false 
    //                     && this.board[0][1] == null 
    //                     && this.board[0][2] == undefined) {
    //                     console.log(true);

    //                 }
    //                 if (this.board[0][7].hasMoved == false 
    //                     && this.board[0][6] == null 
    //                     && this.board[0][5] == undefined) {
    //                     console.log(true);
    //                 }
    //             }
    //             break;
    //         case PieceColor.white:
    //             if (this.board[activePiece.blackKing.y][0].hasMoved == false 
    //                 && this.board[activePiece.blackKing.y][1] == null 
    //                 && this.board[activePiece.blackKing.y][2] == undefined) {
    //                 console.log(true);

    //             }
    //             if (this.board[activePiece.blackKing.y][7].hasMoved == false 
    //                 && this.board[activePiece.blackKing.y][6] == null 
    //                 && this.board[activePiece.blackKing.y][5] == undefined) {
    //                 console.log(true);
    //             }
    //             break;
    //         default:
    //             break;
    //     }
    // }
}