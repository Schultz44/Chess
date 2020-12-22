import { Piece } from '../models/piece';

export const ClearOpenSquares = (board: [Piece[], Piece[]]) => {
    board.forEach((col, y) => {
        col.forEach((square, x) => {
            if (square === undefined) {
                board[y][x] = null;
            }
            else if (board[y][x]?.defenseless) {
                board[y][x].defenseless = false;
            }

        })
    })
}