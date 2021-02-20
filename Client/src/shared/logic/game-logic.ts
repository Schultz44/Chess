
import { BlackBishop, BlackKing, BlackKnight, BlackPond, BlackQueen, BlackRook, WhiteBishop, WhiteKing, WhiteKnight, WhitePond, WhiteQueen, WhiteRook } from '../models/BuildPieces';
import { Piece } from '../models/piece';


export class GameLogic {

    // public player1: Player;
    // public player2: Player;
    // public currentPlayer: Player;

    NewGame(board: [Piece[], Piece[]]): [Piece[], Piece[]] {
        let gameBoard = board
        // this.player1 = new Player({ color: PieceColor.white, turn: true });
        // this.player2 = new Player({ color: PieceColor.black });
        // this.currentPlayer = this.player1
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
    // changePlayersTurn() {
    //     if (this.currentPlayer.turn == this.player1.turn) {
    //         this.currentPlayer = this.player2
    //         this.player1.turn = false
    //         this.player2.turn = true
    //     } else {
    //         this.currentPlayer = this.player1
    //         this.player2.turn = false;
    //         this.player1.turn = true
    //     }
    // }
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

