import { Player } from "./player";

export class Room{
    // roomName;
    // users = [];
    // users: Player[];
    player1 = new Player();
    player2 = new Player();
    id;
    roomName;
    roomKey;

    constructor(data = {}){
        Object.assign(this, data)
    }
}