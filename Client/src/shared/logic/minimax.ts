import { Piece, PieceColor, PieceNames } from "../models/piece";
import { ClearOpenSquares } from "../utilities/clearOpenSquares";
import { ActivePiece, EnumPieceAction } from "./active-piece";

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
    const move = getBlackScore(getBlackPieces(board), board, 2)
    // console.log(move);
    
    // console.log(GetScore(board, blackPieces.find(piece => piece.name == PieceNames.Knight)));
    // whitePieces.forEach((wPiece: Piece) => {

    // })


    new ActivePiece(board).ShowSquares(move.bestPiece, EnumPieceAction.move, move.bestScore.newPosition.y, move.bestScore.newPosition.x);
    
}
const getBlackPieces = (board: [Piece[], Piece[]]): Piece[] => {
    let blackPieces: Piece[] = []
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            const element: Piece = board[i][j];
            if (element) {
                if (element.color == PieceColor.black) {
                    blackPieces.push(element)
                }
            }

        }
    }
    return blackPieces
}
const getWhitePieces = (board: [Piece[], Piece[]]): Piece[] => {
    let whitePieces: Piece[] = []
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            const element: Piece = board[i][j];
            if (element) {
                if (element.color == PieceColor.white) {
                    whitePieces.push(element)
                }
            }

        }
    }
    return whitePieces
}
const getBlackScore = (blackPieces: Piece[], board: [Piece[], Piece[]], depth) => {
    let bestScore: { score: number, newPosition: { y: number, x: number } };
    let bestPiece;
    blackPieces.forEach((piece: Piece) => {
        let score = GetScore(board, piece, depth, PieceColor.black);
        if (bestScore === undefined || bestScore === null || bestScore.score < score.score) {
            bestScore = score
            bestPiece = piece
        }
    })
    // console.log(bestPiece, bestScore);
    return {bestPiece, bestScore}
}

const getWhiteScore = (whitePieces: Piece[], board: [Piece[], Piece[]], depth) => {
    let bestScore: { score: number, newPosition: { y: number, x: number } };
    let bestPiece;
    whitePieces.forEach((piece: Piece) => {
        let score = GetScore(board, piece, depth, PieceColor.white);
        if (bestScore === undefined || bestScore === null || bestScore.score < score.score) {
            bestScore = score
            bestPiece = piece
        }
    })
    // console.log(bestPiece, bestScore);
    return {bestPiece, bestScore}
}

/**
 * Loops through the board
 * Finds all the possible moves for the piece
 * Gives them a rating based on the piece's value
 * Returns the score and the position to move too
 */
const GetScore = (board, piece: Piece, depth = 0, findForColor: PieceColor): { score: number, newPosition: { y: number, x: number } } => {
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
                //     if (findForColor == PieceColor.black) {
                //         // opponentScore = GetScore(board, board[i][j], depth - 1, PieceColor.white)
                //         opponentScore = getWhiteScore(getWhitePieces(board), board, depth - 1).bestScore
                //         opponentScore.score = -1 * opponentScore.score
                //         if (opponentScore.score < bestValue.score ) {
                //             // debugger
                //             bestValue.score = opponentScore.score
                //         }
                //     }
                //     else if(findForColor == PieceColor.white) {
                //         // opponentScore = GetScore(board, board[i][j], depth - 1, PieceColor.black)
                //         opponentScore = getBlackScore(getBlackPieces(board), board, depth - 1).bestScore
                //         if (opponentScore.score > bestValue.score) {
                //             // debugger
                //             bestValue.score = opponentScore.score
                //         }
                //     }
                //     board[i][j] = element
                //     depth -= 1
                // }
                const mini = findForColor == PieceColor.black ? 1 : -1
                if (bestValue.score < mini * 2) {
                    bestValue.score = mini * 2
                    bestValue.newPosition.y = i
                    bestValue.newPosition.x = j
                }
                else if (element?.defenseless) {
                    // debugger
                    if (bestValue.score < mini * 10 && element.pieceValue > piece.pieceValue) {
                        bestValue.score = mini * 10
                        bestValue.newPosition.y = element.y
                        bestValue.newPosition.x = element.x
                    }
                    else if (bestValue.score < mini * 3 && element.pieceValue < piece.pieceValue) {
                        bestValue.score = mini * 3
                        bestValue.newPosition.y = element.y
                        bestValue.newPosition.x = element.x
                    }
                    else if (bestValue.score < mini * 4 && element.pieceValue == piece.pieceValue) {
                        // debugger
                        bestValue.score = mini * 4
                        bestValue.newPosition.y = element.y
                        bestValue.newPosition.x = element.x
                    }
                }
            }
        }
    }
    ClearOpenSquares(board)
    return bestValue
}