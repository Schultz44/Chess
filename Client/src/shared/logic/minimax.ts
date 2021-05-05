import { Piece, PieceColor, PieceNames } from "../models/piece";
import { ClearOpenSquares } from "../utilities/clearOpenSquares";
import { ActivePiece, EnumPieceAction } from "./active-piece";

interface Score {
    score: number
    newPosition: { y: number, x: number }
}

export const Minimax = (board: [Piece[], Piece[]], piece = new Piece(), depth = 1, pieceColor = PieceColor.black): void => {
    // let whitePieces: Piece[] = []
    // let blackPieces: Piece[] = []
    // // new ActivePiece(board).ShowSquares(piece, EnumPieceAction.show);
    // for (let i = 0; i < board.length; i++) {
    //     for (let j = 0; j < board[i].length; j++) {
    //         const element: Piece = board[i][j];

    //         if (element) {
    //             if (element.color == PieceColor.white) {
    //                 whitePieces.push(element)
    //             }
    //             else if (element.color == PieceColor.black) {
    //                 blackPieces.push(element)
    //             }
    //         }

    //     }
    // }


    // DONT GO PAST 4 --------------------------- 4 FOUR!!!!!
    const move = getScoreOfColor(PieceColor.black, getAllPiecesOfColor(PieceColor.black, board), board, 2)
    // console.log(move);

    // console.log(GetScore(board, blackPieces.find(piece => piece.name == PieceNames.Knight)));
    // whitePieces.forEach((wPiece: Piece) => {

    // })


    new ActivePiece(board).ShowSquares(move.bestPiece, EnumPieceAction.move, move.bestScore.newPosition.y, move.bestScore.newPosition.x);

}

/**
 * returns an array of all pieces matching color (param) on the board
 * @param color 
 * @param board 
 * @returns Piece[]
 */
const getAllPiecesOfColor = (color: PieceColor, board: [Piece[], Piece[]]): Piece[] => {
    let pieces: Piece[] = []
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            const element: Piece = board[i][j];
            if (element) {
                if (color == PieceColor.white && element.color == PieceColor.white) {
                    pieces.push(element)
                }

                if (color == PieceColor.black && element.color == PieceColor.black) {
                    pieces.push(element)
                }

            }

        }
    }
    return pieces
}

/**
 * Goes through the array of pieces based on color (param)
 * Each piece calls the GetScore function to receive a score
 * That score for the piece is stored in a variable; bestScore
 * @param color 
 * @param pieces 
 * @param board 
 * @param depth 
 */
const getScoreOfColor = (color: PieceColor, pieces: Piece[], board: [Piece[], Piece[]], depth) => {
    let bestScore: Score;
    let bestPiece: Piece;
    pieces.forEach((piece: Piece) => {
        let score: Score
        if (color == PieceColor.black) {
            score = GetScore(board, piece, depth, PieceColor.black);
        }
        else if (color == PieceColor.white) {
            score = GetScore(board, piece, depth, PieceColor.white);
        }
        if (bestScore === undefined || bestScore === null || bestScore.score < score.score) {
            bestScore = score
            bestPiece = piece
        }
    })
    // console.log(bestPiece, bestScore);
    return { bestPiece, bestScore }
}

/**
 * Loops through the board
 * Finds all the possible moves for the piece
 * Gives them a rating based on the piece's value
 * Returns the score and the position to move too
 * @param board 
 * @param piece 
 * @param depth 
 * @param findForColor 
 * @returns Score
 */
const GetScore = (board, piece: Piece, depth = 0, color: PieceColor): Score => {
    new ActivePiece(board).ShowSquares(piece, EnumPieceAction.show);

    let bestValue = { score: 0, newPosition: { y: 0, x: 0 } };
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            const element: Piece = board[i][j];
            if ((element === undefined || element?.defenseless) && element !== null) {
                // let opponentScore = { score: 0, newPosition: { y: 0, x: 0 } };
                // if (depth - 1 > 0) {
                //     // const savedSpot = element
                //     // Might have to make sure board at below position is reset
                //     board[i][j] = piece
                //     if (color == PieceColor.black) {
                //         // opponentScore = GetScore(board, board[i][j], depth - 1, PieceColor.white)
                //         opponentScore = getScoreOfColor(PieceColor.white, getAllPiecesOfColor(PieceColor.white, board), board, depth - 1).bestScore
                //         opponentScore.score = -1 * opponentScore.score
                //         if (opponentScore.score < bestValue.score) {
                //             // debugger
                //             bestValue.score = opponentScore.score
                //         }
                //     }
                //     else if (color == PieceColor.white) {
                //         // opponentScore = GetScore(board, board[i][j], depth - 1, PieceColor.black)
                //         opponentScore = getScoreOfColor(PieceColor.white, getAllPiecesOfColor(PieceColor.black, board), board, depth - 1).bestScore
                //         if (opponentScore.score > bestValue.score) {
                //             // debugger
                //             bestValue.score = opponentScore.score
                //         }
                //     }
                //     board[i][j] = element
                //     depth -= 1
                // }
                const mini = color == PieceColor.black ? 1 : -1
                if (bestValue.score < mini * 2) {
                    bestValue.score = mini * 2
                    bestValue.newPosition.y = i
                    bestValue.newPosition.x = j
                }
                else if (element?.defenseless) {
                    bestValue = evaluteBestPosition(element, piece, mini)
                }
            }
        }
    }
    ClearOpenSquares(board)
    return bestValue
}

function evaluteBestPosition(element: Piece, piece: Piece, mini: number): Score {

    let bestValue: Score = { score: 0, newPosition: { y: 0, x: 0 } };
    if (element.name == PieceNames.King) {
        bestValue.score = mini * 100
        bestValue.newPosition.y = element.y
        bestValue.newPosition.x = element.x
    }
    // This will cause the current piece to caputre an enemy piece of higher value
    else if (bestValue.score < mini * 10 && element.pieceValue > piece.pieceValue) {
        bestValue.score = mini * 10
        bestValue.newPosition.y = element.y
        bestValue.newPosition.x = element.x
    }
    // This will cause the current piece to caputre an enemy piece of lesser value
    else if (bestValue.score < mini * 3 && element.pieceValue < piece.pieceValue) {
        bestValue.score = mini * 3
        bestValue.newPosition.y = element.y
        bestValue.newPosition.x = element.x
    }
    // Current piece captures enemy piece of equal value
    if (bestValue.score < mini * 4 && element.pieceValue == piece.pieceValue) {
        bestValue.score = mini * 4
        bestValue.newPosition.y = element.y
        bestValue.newPosition.x = element.x
    }
    return bestValue
}