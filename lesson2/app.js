const users = [
    {
        login:'hasla',
        password:123
    },
    {
        login:'keks',
        password:12
    },
    {
        login:'lex',
        password:1
    }
]
//
//
// app.get('/welcome', (req, res) => {
//     // res.send('helo world');
//     res.json(users)
//
// });


const express = require('express');
const {engine} = require('express-handlebars');
const path = require('path')
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

app.get('/users', (req, res) => {
    res.render('users', {users})
})
app.get('/users/:id', (req, res) => {
    const {id} = req.params;
    console.log(req.query);
    res.json(users[id])
})

app.get('/login.hbs', (req, res) => {
    res.render('login')
});

app.post('/login.hbs', ((req, res) => {
    users.push(req.body)
    res.redirect('/users')
    // console.log(req.body)
}))

app.use((req, res) => {
    res.render('notFound')
})

app.listen(5200, () => {
    console.log('server')
});


