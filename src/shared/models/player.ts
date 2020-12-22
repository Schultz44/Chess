import { Piece, PieceColor } from './piece';

export class Player{
    constructor(data = {}){
        Object.assign(this, data)
    }
    public turn: boolean;
    public previousTurns = [];
    public lostPieces: Piece[] = [];
    public color: PieceColor;
    public winner = false;
    public checked = false;
}