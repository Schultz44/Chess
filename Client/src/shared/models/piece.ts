/* eslint-disable no-unused-vars */
export enum PieceNames {
  Pond = 'Pond',
  King = 'King',
  Queen = 'Queen',
  Knight = 'Knight',
  Bishop = 'Bishop',
  Rook = 'Rook',
}
export enum PieceColor {
  white = 'white',
  black = 'black',
}
export class Piece {
  name: PieceNames;
  x: number;
  y: number;
  color: PieceColor;
  image: string;
  defenseless: boolean;
  hasMoved: boolean;
  pieceValue = 0;
}
