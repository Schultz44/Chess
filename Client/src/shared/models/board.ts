import { Piece } from "./piece";
import { Room } from "./room";

export class Game {
    public board: [Piece[], Piece[]] = [[], []];
    public room = new Room();

    constructor(data = {}) {
        Object.assign(this, data)
    }
}