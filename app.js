const fs = require('fs');
const path = require('path');
const inPerson = [
    {
        name: 'Oleg',
        age: 23,
        city: 'Lviv'
    },
    {
        name: 'Dima',
        age: 24,
        city: 'Kyiv'
    },
    {
        name: 'Max',
        age: 18,
        city: 'Odessa'
    },
    {
        name: 'Lilia',
        age: 25,
        city: 'Ternopil'
    },
    {
        name: 'Alisa',
        age: 21,
        city: 'Horodok'
    }
];
const online = [
    {
        name: 'Mike',
        age: 22,
        city: 'LA'
    },
    {
        name: 'Nikol',
        age: 22,
        city: 'New York'
    },
    {
        name: 'Elsa',
        age: 19,
        city: 'Arizona'
    },
    {
        name: 'Bill',
        age: 25,
        city: 'Sambir'
    },
    {
        name: 'Homer',
        age: 40,
        city: 'Springfield'
    }
];

// fs.mkdir(path.join(__dirname, 'main', 'online'),{recursive: true},err => {
//     if (err){
//         console.log(err)
//     }
// })


// fs.mkdir(path.join(__dirname, 'main', 'inPerson'), {recursive: true}, err => {
//     if (err) {
//         console.log(err)
//     }
// })


// for (const item of online) {
//     fs.writeFile(path.join(__dirname, 'main', 'online', 'online.txt'), `${item.name}\n ${item.age}\n${item.city}\n`,{flag:'a'}, (err) => {
//         if (err) {
//             console.log(err)
//         }
//     })
// }
// for (const item of inPerson) {
//     fs.writeFile(path.join(__dirname, 'main', 'inPerson', 'inPerson.txt'), `${item.name}\n ${item.age}\n${item.city}\n`,{flag:'a'}, (err) => {
//         if (err) {
//             console.log(err)
//         }
//     })
// }

//
// fs.readFile(path.join(__dirname, 'main', 'inPerson', 'inPerson.txt'), (err, data) => {
//     fs.writeFile(path.join(__dirname, 'main', 'online', 'online.txt'), data, err => {
//         if (err){
//             console.log(err)
//         }
//     })
//
//     if (err){
//         console.log(err)
//     }
// })
// fs.readFile(path.join(__dirname, 'main', 'online', 'online.txt'), (err, data) => {
//     fs.writeFile(path.join(__dirname, 'main', 'inPerson', 'inPerson.txt'), data, err => {
//         if (err){
//             console.log(err)
//         }
//     })
//
//     if (err){
//         console.log(err)
//     }
// })
//











