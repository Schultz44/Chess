// let app = require('express')();
// let http = require('http').createServer(app);
// let io = require('socket.io-client')(http);

// app.get('/', (req, res) => {
//     res.send('<h1>Chess</h1>');
// })
// io.on('connection', (socket) => {
//     socket.on('yo', data => {console.log('yo');});
//     socket.emit('yo', 'yo');
//     console.log('a user connected');
//     // socket.on('disconnect', () => {
//     //     console.log('--------------------');
//     // });
//     socket.on('my message', (msg) => {
//         console.log('message: ' + msg);
//         io.emit('my broadcast', `server: ${msg}`)
//     });
// });
// // io.on('connection', (socket) => {
// //     console.log('connected-');
// //     socket.on('yo', data => {
// //         console.log('yo' + yo);
// //     })

// //     // Disconnect from the server
// //     socket.on('disconnect', () => {
// //         console.log('disconnected');
// //     })

// //     // When we receive a 'board object' event from our client, we emit the value
// //     // socket.on('board object', (board) => {
// //     //     console.log('board');
// //     //     io.emit('board object', board);
// //     // })
// // })
// io.on('yo', socket => {
//     console.log('board', socket);
// })
// http.listen(3000, () => {
//     console.log('started on port 3000');
// })