import { Piece, PieceNames, PieceColor } from './piece'

// Rook
export class BlackPond implements Piece {
    name = PieceNames.Pond
    x = 0;
    y = 1;
    color = PieceColor.black
    image = './assets/img/pond-active.svg';
    defenseless = false;
    hasMoved = false;
    constructor(data = {}) {
        Object.assign(this, data);
    }
}
export class WhitePond implements Piece {
    name = PieceNames.Pond
    x = 0;
    y = 6;
    color = PieceColor.white
    image = './assets/img/pond-active.svg';
    defenseless = false;
    hasMoved = false;
    constructor(data = {}) {
        Object.assign(this, data)
    }
}
// Rook
export class BlackRook implements Piece {
    name = PieceNames.Rook
    x = 0;
    y = 0;
    color = PieceColor.black
    image = './assets/img/rook-active.svg';
    defenseless = false;
    hasMoved = false;
    constructor(data = {}) {
        Object.assign(this, data);
    }
}
export class WhiteRook implements Piece {
    name = PieceNames.Rook
    x = 0;
    y = 7;
    color = PieceColor.white
    image = './assets/img/rook-active.svg';
    defenseless = false;
    hasMoved = false;
    constructor(data = {}) {
        Object.assign(this, data)
    }
}
// Knight
export class BlackKnight implements Piece {
    name = PieceNames.Knight
    x = 0;
    y = 0;
    color = PieceColor.black
    image = './assets/img/knight-active.svg';
    defenseless = false;
    hasMoved = false;
    constructor(data = {}) {
        Object.assign(this, data);
    }
}
export class WhiteKnight implements Piece {
    name = PieceNames.Knight
    x = 0;
    y = 7;
    color = PieceColor.white
    image = './assets/img/knight-active.svg';
    defenseless = false;
    hasMoved = false;
    constructor(data = {}) {
        Object.assign(this, data)
    }
}
// Bishop
export class BlackBishop implements Piece {
    name = PieceNames.Bishop
    x = 0;
    y = 0;
    color = PieceColor.black
    image = './assets/img/bishop-active.svg';
    defenseless = false;
    hasMoved = false;
    constructor(data = {}) {
        Object.assign(this, data);
    }
}
export class WhiteBishop implements Piece {
    name = PieceNames.Bishop
    x = 0;
    y = 7;
    color = PieceColor.white
    image = './assets/img/bishop-active.svg';
    defenseless = false;
    hasMoved = false;
    constructor(data = {}) {
        Object.assign(this, data)
    }
}
// King
export class BlackKing implements Piece {
    name = PieceNames.King
    x = 4;
    y = 0;
    color = PieceColor.black
    image = './assets/img/king-active.svg';
    defenseless = false;
    hasMoved = false;
    constructor(data = {}) {
        Object.assign(this, data);
    }
}
export class WhiteKing implements Piece {
    name = PieceNames.King
    x = 4;
    y = 7;
    color = PieceColor.white
    image = './assets/img/king-active.svg';
    defenseless = false;
    hasMoved = false;
    constructor(data = {}) {
        Object.assign(this, data)
    }
}
// Queen
export class BlackQueen implements Piece {
    name = PieceNames.Queen
    x = 3;
    y = 0;
    color = PieceColor.black
    image = './assets/img/queen-active.svg';
    defenseless = false;
    hasMoved = false;
    constructor(data = {}) {
        Object.assign(this, data);
    }
}
export class WhiteQueen implements Piece {
    name = PieceNames.Queen
    x = 3;
    y = 7;
    color = PieceColor.white
    image = './assets/img/queen-active.svg';
    defenseless = false;
    hasMoved = false;
    constructor(data = {}) {
        Object.assign(this, data)
    }
}