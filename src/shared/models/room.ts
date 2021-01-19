export class Room{
    roomName;
    users = [];

    constructor(data = {}){
        Object.assign(this, data)
    }
}