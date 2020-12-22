import { Piece, PieceColor } from '../models/piece'

export enum SquareState {
    empty = 'empty',
    enemy = 'enemy',
    teammate = 'teammate'
}

export const CheckSqaureState = (board: [Piece[], Piece[]], y: number, x: number, enemyColor: PieceColor): SquareState => {
    const teamamteColor = enemyColor == PieceColor.white ? PieceColor.black : PieceColor.white
    if (board[y][x] === null) {
        board[y][x] = undefined
        return SquareState.empty
    }
    else if (board[y][x]?.color === enemyColor) {
        board[y][x].defenseless = true
        return SquareState.enemy
    }
    else if (board[y][x]?.color === teamamteColor) {
        return SquareState.teammate
    }
}