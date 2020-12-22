import { Piece, PieceColor } from '../models/piece';
import { CheckSqaureState, SquareState } from '../utilities/checkSquareState';

export class Bishop {
    private piece: Piece;
    private board: [Piece[], Piece[]]
    constructor(private _piece: Piece, private _board: [Piece[], Piece[]]) {
        this.piece = _piece;
        this.board = _board
    }

    viewMovementOptions() {
        this.moveDiagnoalAlongAxis('up')
        this.moveDiagnoalAlongAxis('down')
    }
    private moveDiagnoalAlongAxis(direction: string) {
        const _Y = this.piece.y;
        const _X = this.piece.x;
        let isLeftSquareBlocked = false
        let isRightSquareBlocked = false;
        let leftSquareState: SquareState
        let rightSquareState: SquareState
        const enemyColor = this.piece.color == PieceColor.black ? PieceColor.white : PieceColor.black
        for (let index = 1; index < this.board.length; index++) {
            const dir = direction == 'up' ? _Y - index : _Y + index
            if (this.board[dir]) {
                const isInRightBounds = _X + index <= 8
                const isInLeftBounds = _X - index >= 0
                if (!isRightSquareBlocked && isInRightBounds) {
                    rightSquareState = CheckSqaureState(this.board, dir, _X + index, enemyColor)
                    isRightSquareBlocked = rightSquareState == SquareState.enemy || rightSquareState == SquareState.teammate
                }
                if (!isLeftSquareBlocked && isInLeftBounds) {
                    leftSquareState = CheckSqaureState(this.board, dir, _X - index, enemyColor)
                    isLeftSquareBlocked = leftSquareState == SquareState.enemy || leftSquareState == SquareState.teammate
                }
            }
        }
    }
}