// const {greeting} = require('./healper');
//
// greeting('Name');
//
//
// console.log(__dirname)
// console.log(__filename)
//
// const {tests} = require('./test/healper');
//
// tests()
//
// console.log(process.cwd(), 'procesCwd')
//
// console.log(__dirname, 'appDirname')
//
//
//
// global.name = 'hello';
//
// console.log(global.name);
// console.log(name);
//
// require('./test/healper');
//
// console.log(name)
//
// const path = require('path');
//
// const joinPath = path.join('test', 'test2', 'paplic', 'text.txt');
//
// console.log(joinPath);
//
//
// const nomalize = path.normalize('text//dahhd////uceycd////tetxt.txt');
// console.log(nomalize);
//
// const resolve = path.resolve('test//dfjjfe////file.txt');
// console.log(resolve, 'resolved')
//
//
// const os = require('os');
// console.log(os.cpus())
// console.log(os.cpus().length);
// console.log(os.arch())
const path = require('path')

const fs = require('fs');

// fs.writeFileSync(path.join(__dirname, 'files', 'file.txt'), 'some data');
// fs.writeFile(path.join(__dirname, 'files', 'file2.txt'), 'some data2', (err => {
//     if(err){
//         console.log(err);
//         throw err;
//     }
// }))
// fs.readFile(path.join(__dirname, 'files', 'file2.txt'), /*'utf-8',*/(err, data) => {
//     if(err){
//         console.log(err);
//         throw err;
//     }
//     console.log(data)
// })
// for (let i = 0; i < 1000; i++) {
//     fs.appendFile(path.join(__dirname, 'files', 'file2.txt'), '\nnewDate',{flag: 'w'} ,(err) => {
//         if (err) {
//             console.log(err);
//             throw err;
//         }
//     })
//
// }
// fs.truncate(path.join(__dirname, 'files', 'file2.txt'), (err => {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
// }))
//
//
// fs.unlink(path.join(__dirname, 'files', 'file2.txt'), err => {
//     if (err){
//         console.log(err)
//     }
// })
// fs.mkdir(path.join(__dirname, 'pablic', 'files', 'test', 'test2'), {recursive: true}, err => {
//     if (err){
//         console.log(err)
//     }
// })
// fs.rmdir(path.join(__dirname, 'pablic'), (err => {
//     console.log(err)
// }))
// fs.readdir(path.join(__dirname, 'pablic'), (err, data)=>{
//     console.log(data)
// })
//


fs.rename(path.join(__dirname, 'pablic', 'pizdec'), path.join(__dirname, 'pablic', 'files','hohoho'), err => {
    if (err) {

        console.log(err)
    }

})



