// const{EventEmitter} = require('events');
// const events = require("events");
//
// const ee = new EventEmitter();
//
// ee.on('log', (name) => {
//     console.log(`hello world!!!!!!${name}`);
// })
//
// ee.once('test', () => {
//     console.log('once is working');
// })
//
// ee.emit('test');
//
// // ee.emit('log', 'oleg');
// // ee.emit('log', 'oleg');
// // ee.emit('log', 'oleg');
// // ee.emit('log', 'oleg');
// // ee.emit('log', 'oleg');
// // ee.emit('log', 'oleg');
// // ee.emit('log', 'oleg');
// // ee.emit('log', 'oleg');
//
// console.log(ee.eventNames());
//

// const fs = require('fs');
// const path = require('path');
//
// const readStrem = fs.createReadStream(path.join(__dirname, 'text'));
// const writeStrim = fs.createWriteStream(path.join(__dirname, 'fileTest.txt'));


// readStrem.pipe(writeStrim)

// readStrem.on('data', chunk => {
//     // console.log(chunk.toString());
//     writeStrim.write(chunk, (error => {
//         if (error) {
//             console.log(error)
//             throw error
//         }
//     }))
//
//     writeStrim.end();
//
//
// })


// for (let i = 0; i < 5000; i++) {
//     writeStrim.write(chunk, (error => {
//         if (error){
//             console.log(error)
//             throw error
//         }
//     }))
// }











