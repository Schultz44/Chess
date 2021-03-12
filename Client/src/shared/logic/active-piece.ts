import { WhiteKing, BlackKing } from '../models/BuildPieces';
import { Piece, PieceNames, PieceColor } from '../models/piece';
import { Player } from '../models/player';
import { ClearOpenSquares } from '../utilities/clearOpenSquares';
import { Bishop } from './bishop';
import { King } from './king';
import { Knight } from './knight';
import { Pond } from './pond';
import { Rook } from './rook';

export enum EnumPieceAction {
    show = 'show',
    move = 'move'
}
export class ActivePiece {
    whiteKing = new WhiteKing;
    blackKing = new BlackKing;
    private board: [Piece[], Piece[]];
    constructor(_board: [Piece[], Piece[]]) {
        this.board = _board;
        this.blackKing = _board[new BlackKing().y][new BlackKing().x]
        this.whiteKing = _board[new WhiteKing().y][new WhiteKing().x]

    }
    ShowSquares(piece: Piece, action = EnumPieceAction.show, y?, x?) {

        // ClearOpenSquares(this.board);
        switch (piece.name) {
            case PieceNames.Pond:
                if (action == EnumPieceAction.show) {
                    new Pond(piece, this.board).viewMovementOptions()
                }
                else if (action == EnumPieceAction.move) {
                    this.movePiece(piece, y, x)
                }
                break;
            case PieceNames.King:
                if (action == EnumPieceAction.show) {
                    new King(piece, this.board).viewMovementOptions()
                }
                else if (action == EnumPieceAction.move) {
                    this.movePiece(piece, y, x)
                    if (piece.color == PieceColor.black) {
                        this.blackKing = piece
                    }
                    else this.whiteKing = piece
                }
                break;
            case PieceNames.Queen:
                if (action == EnumPieceAction.show) {
                    new Rook(piece, this.board).viewMovementOptions()
                    new Bishop(piece, this.board).viewMovementOptions()
                }
                else if (action == EnumPieceAction.move) {
                    this.movePiece(piece, y, x)
                }
                break;
            case PieceNames.Knight:
                if (action == EnumPieceAction.show) {
                    new Knight(piece, this.board).viewMovementOptions()
                }
                else if (action == EnumPieceAction.move) {
                    this.movePiece(piece, y, x);
                }
                break;
            case PieceNames.Bishop:
                if (action == EnumPieceAction.show) {
                    new Bishop(piece, this.board).viewMovementOptions()
                }
                else if (action == EnumPieceAction.move) {
                    this.movePiece(piece, y, x)
                }
                break;
            case PieceNames.Rook:
                if (action == EnumPieceAction.show) {
                    new Rook(piece, this.board).viewMovementOptions()
                }
                else if (action == EnumPieceAction.move) {
                    this.movePiece(piece, y, x)
                }
                break;
            default:
                break;
        }
    }

    private movePiece(piece: Piece, y: number, x: number) {
        this.board[piece.y][piece.x] = null
        piece.x = x;
        piece.y = y;
        piece.hasMoved = true;
        this.board[y][x] = piece
    }

    isKingInCheck(pieceColor: PieceColor, player?: Player): boolean {
        this.board.forEach(col => {
            col.forEach(square => {
                if (square != null && square.color != pieceColor) {
                    this.ShowSquares(square);
                }
            })
        })
        const flag = pieceColor == PieceColor.black ? this.blackKing?.defenseless : this.whiteKing?.defenseless
        if (player && flag) {
            player.checked = true;
        }
        else if (player && !flag) {
            player.checked = false
        }
        ClearOpenSquares(this.board);
        return flag
    }

    isCheckMate(pieceColor: PieceColor): boolean{
        this.board.forEach(col => {
            col.forEach(square => {
                if (square != null && square.color != pieceColor) {
                    this.ShowSquares(square);
                }
            })
        })
        return false
    }
}

