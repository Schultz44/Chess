import { Piece, PieceColor } from "../models/piece";

export class Pond {
    private piece: Piece;
    private board;
    constructor(private _piece: Piece, private _board: [Piece[], Piece[]]){
        this.piece = _piece
        this.board = _board;
    }
    viewMovementOptions(){

        const _X = this.piece.x
        const _Y = this.piece.y
        // Black Piece
        if (this.piece.color == PieceColor.black) {
            // Check for attack
            if (this.board[_Y + 1][_X + 1]?.color == PieceColor.white) {
                this.board[_Y + 1][_X + 1].defenseless = true;
            }
            // Check for attack
            if (this.board[_Y + 1][_X - 1]?.color == PieceColor.white) {
                this.board[_Y + 1][_X - 1].defenseless = true;
            }
            // Show 1 space ahead
            if (this.board[_Y + 1][_X] == null) {
                this.board[_Y + 1][_X] = undefined;
                // Show second space ahead if pond hasn't moved and square is empty
                if (this.piece.y == 1 && this.board[_Y + 2][_X] == null) {
                    this.board[_Y + 2][_X] = undefined;
                }
            }
        }
        // White Piece
        else if (this.piece.color == PieceColor.white) {
            // Check for attack
            if (this.board[_Y - 1][_X + 1]?.color == PieceColor.black) {
                this.board[_Y - 1][_X + 1].defenseless = true;
            }
            // Check for attack
            if (this.board[_Y - 1][_X - 1]?.color == PieceColor.black) {
                this.board[_Y - 1][_X - 1].defenseless = true;
            }
            // Show 1 space ahead
            if (this.board[_Y - 1][_X] == null) {
                this.board[_Y - 1][_X] = undefined;
                // Show second space ahead if pond hasn't moved and square is empty
                if (this.piece.y == 6 && this.board[_Y - 2][_X] == null) {
                    this.board[_Y - 2][_X] = undefined;
                }
            }
        }
    }
}