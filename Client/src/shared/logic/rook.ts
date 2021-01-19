import { Piece, PieceColor } from '../models/piece';
import { CheckSqaureState, SquareState } from '../utilities/checkSquareState';

export class Rook {
    private piece: Piece;
    private board: [Piece[], Piece[]]
    constructor(private _piece: Piece, private _board: [Piece[], Piece[]]) {
        this.piece = _piece;
        this.board = _board
    }
    viewMovementOptions() {
        this.moveAlongAxis('xAxis')
        this.moveAlongAxis('yAxis')
    }
    private moveAlongAxis(direction: string) {
        const _Y = this.piece.y;
        const _X = this.piece.x;
        let isLeftSquareBlocked = false
        let isRightSquareBlocked = false;
        let leftSquareState: SquareState
        let rightSquareState: SquareState
        const enemyColor = this.piece.color == PieceColor.black ? PieceColor.white : PieceColor.black
        for (let index = 1; index < this.board.length; index++) {
            const yAxis = direction == 'yAxis' ? index : 0
            const xAxis = direction == 'xAxis' ? index : 0
            if (this.board[_Y + yAxis]) {
                if (!isRightSquareBlocked) {
                    rightSquareState = CheckSqaureState(this.board, _Y + yAxis, _X + xAxis, enemyColor)
                    isRightSquareBlocked = rightSquareState == SquareState.enemy || rightSquareState == SquareState.teammate
                }
            }
            if (this.board[_Y - yAxis]) {
                if (!isLeftSquareBlocked) {
                    leftSquareState = CheckSqaureState(this.board, _Y - yAxis, _X - xAxis, enemyColor)
                    isLeftSquareBlocked = leftSquareState == SquareState.enemy || leftSquareState == SquareState.teammate
                }
            }
        }
    }
}