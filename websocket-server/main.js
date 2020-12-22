let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('connected-');
    socket.emit('board object', '--------------------')
    socket.on('disconnect', function () {
        console.log('disconnected');
    })

    // When we receive a 'board object' event from our client, we emit the value
    socket.on('board object', (board) => {
        console.log('board');
        io.emit('board object', board);
    })
})

http.listen(3000, () => {
    console.log('started on port 4200');
})