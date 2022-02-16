const path = require('path')
const fs = require('fs');


// 1)   Спробуйте створити якийсь файл txt, прочитайте з нього дані і одразу, дані які ви отримали запишіть їх в інший
// файл, в вас вийде невеликий callback hell, пізніше я вам покажу
// як можна це обійти, але поки зробіть так
//
// fs.writeFile(path.join(__dirname, 'file.txt'), 'someData', {flag:'a'},(err, data) => {
//     if (err) {
//         console.log(err)
//     }
//     else {
//         fs.readFile(path.join(__dirname, 'file.txt'), (e, data) => {
//             if (e) {
//                 console.log(e)
//             } else {
//                 fs.writeFile(path.join(__dirname, 'file2.txt'), `${data}`, {flag: 'a'}, (err) => {
//                         if (err) {
//                             console.log(err);
//                         }
//                     }
//                 )
//             }
//         })
//     }
// })

// 2) Створіть файл ( можете вручну ) заповніть його якимись даними
// Прочитайте його, скопіюйте всі дані з нього і перенесіть їх в нову папку та файл в ній,
//     старий файл видаліть після того як все завершиться. Також вийде callback hell
//
// fs.readFile(path.join(__dirname, 'file.txt'), (err) => {
//     if (err) {
//         console.log(err)
//     } else {
//         fs.mkdir(path.join(__dirname, 'main'), {recursive: true}, err => {
//             if (err) {
//                 console.log(err)
//             } else {
//                 fs.copyFile(path.join(__dirname, 'file.txt'), 'main/text.txt', err => {
//                     if (err) {
//                         console.log(err)
//                     } else {
//                         fs.unlink(path.join(__dirname, 'file.txt'), err=>{
//                             if (err){
//                                 console.log(err)
//                             }
//                         })
//
//                     }
//                 })
//             }
//         })
//
//     }
// })

// 3) Створіть папку (можете вручну) напишіть скріпт який створить в ній якись дані (можуть бути нові папки
// і файли(в файли запишіть якусь дату) )
// і напишіть функцію яка буде зчитувати папку і перевіряти якщо дані які в ній лежать - це файли тоді вам потрібно
// їх очистити, але не видаляти, якщо дані - це папки, вам потрібно їх перейменувати і додати до назви префікс _new

// перевіряє чи файл
// fs.mkdir(path.join(__dirname, 'papka'), {recursive: true}, err => {
//     if (err) {
//         console.log(err)
//     } else {
//         fs.writeFile(path.join(__dirname, 'papka', 'data'), 'someData', (err, data) => {
//             if (err) {
//                 console.log(err)
//             } else if (fs.existsSync(path.join(__dirname, 'papka'))) {
//                 fs.truncate(path.join(__dirname, 'papka', 'data'), err => {
//                     if (err){
//                         console.log(err)
//                     }
//                 })
//             }else {
//                 fs.rename(path.join(__dirname, 'papka'), path.join(__dirname, 'newPapka'), err => {
//                     if (err){
//                         console.log(err)
//                     }
//                 })
//             }
//         })
//     }
// })


//  перевіряє чи папка
//
// fs.mkdir(path.join(__dirname, 'papka'), {recursive: true}, err => {
//     if (err) {
//         console.log(err)
//     } else {
//         fs.mkdir(path.join(__dirname, 'papka', 'data'), {recursive:true}, (err) => {
//             if (err) {
//                 console.log(err)
//             } else if (!fs.existsSync(path.join(__dirname, 'papka'))) {
//                 fs.truncate(path.join(__dirname, 'papka', 'data'), err => {
//                     if (err){
//                         console.log(err)
//                     }
//                 })
//             }else {
//                 fs.rename(path.join(__dirname, 'papka'), path.join(__dirname, 'newPapka'), err => {
//                     if (err){
//                         console.log(err)
//                     }
//                 })
//             }
//         })
//     }
// })


















