import { Piece, PieceColor } from '../models/piece';
import { CheckSqaureState } from '../utilities/checkSquareState';

export class Knight {
    private piece: Piece;
    private board: [Piece[], Piece[]]
    constructor(private _piece: Piece, private _board: [Piece[], Piece[]]) {
        this.piece = _piece;
        this.board = _board
    }

    viewMovementOptions() {
        const _X = this.piece.x
        const _Y = this.piece.y
        const enemyColor = this.piece.color == PieceColor.black ? PieceColor.white : PieceColor.black
        if (this.board[_Y + 2]) {
            CheckSqaureState(this.board, _Y + 2, _X + 1, enemyColor)
            CheckSqaureState(this.board, _Y + 2, _X - 1, enemyColor)
        }
        if (this.board[_Y + 1]) {
            CheckSqaureState(this.board, _Y + 1, _X + 2, enemyColor)
            CheckSqaureState(this.board, _Y + 1, _X - 2, enemyColor)
        }
        if (this.board[_Y - 2]) {
            CheckSqaureState(this.board, _Y - 2, _X + 1, enemyColor)
            CheckSqaureState(this.board, _Y - 2, _X - 1, enemyColor)
        }
        if (this.board[_Y - 1]) {
            CheckSqaureState(this.board, _Y - 1, _X + 2, enemyColor)
            CheckSqaureState(this.board, _Y - 1, _X - 2, enemyColor)
        }
    }
}