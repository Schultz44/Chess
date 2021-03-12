
import { BlackBishop, BlackKing, BlackKnight, BlackPond, BlackQueen, BlackRook, WhiteBishop, WhiteKing, WhiteKnight, WhitePond, WhiteQueen, WhiteRook } from '../models/BuildPieces';
import { Piece } from '../models/piece';


export class GameLogic {

    NewGame(board: [Piece[], Piece[]]): [Piece[], Piece[]] {
        let gameBoard = board
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                for (const piece of this.startingPieces) {
                    if (
                        i == piece.y &&
                        j == piece.x
                    ) {
                        gameBoard[i][j] = piece;
                    }
                }
            }
        }
        console.log(board);

        return board
    }
    private readonly startingPieces = [
        // Pond
        // Black
        new BlackPond({ x: 0 }),
        new BlackPond({ x: 1 }),
        new BlackPond({ x: 2 }),
        new BlackPond({ x: 3 }),
        new BlackPond({ x: 4 }),
        new BlackPond({ x: 5 }),
        new BlackPond({ x: 6 }),
        new BlackPond({ x: 7 }),
        // White
        new WhitePond({ x: 0 }),
        new WhitePond({ x: 1 }),
        new WhitePond({ x: 2 }),
        new WhitePond({ x: 3 }),
        new WhitePond({ x: 4 }),
        new WhitePond({ x: 5 }),
        new WhitePond({ x: 6 }),
        new WhitePond({ x: 7 }),
        // Rook
        new BlackRook({ x: 0 }),
        new BlackRook({ x: 7 }),
        new WhiteRook({ x: 0 }),
        new WhiteRook({ x: 7 }),
        // Knight
        new WhiteKnight({ x: 1 }),
        new WhiteKnight({ x: 6 }),
        new BlackKnight({ x: 1 }),
        new BlackKnight({ x: 6 }),
        // Bishop
        new BlackBishop({ x: 2 }),
        new BlackBishop({ x: 5 }),
        new WhiteBishop({ x: 2 }),
        new WhiteBishop({ x: 5 }),
        // King
        new WhiteKing(),
        new BlackKing(),
        // Queen
        new WhiteQueen(),
        new BlackQueen(),
    ]
}

