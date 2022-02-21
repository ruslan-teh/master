// ДЗ
// декілька ендпоінтів зробити
// 1. /login.hbs, поля які треба відрендерити в файлі hbs: firstName, lastName, email(унікальне поле), password, age, city
// просто зробити темплейт з цим усім і вводити свої дані які будуть пушитися в масив і редірект робити на сторінку
// з усіма юзерами /users і перевірка чи такий імейл не існує, якщо існує то редірект на еррор пейдж
// 2. /users просто сторінка з усіма юзерами, але можна по квері параметрам їх фільтрувати по age і city
// 3. /user/:id сторінка з інфою про одного юзера
// 4. зробити якщо не відпрацюють ендпоінти то на сторінку notFound редірект


// Необхідно розширити ваше ДЗ:
// - додайте ендпоінт signIn який буде приймати email і password і якщо все вірно то редірект на сторінку цього


const express = require('express');
const {engine} = require('express-handlebars');
const path = require('path');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'static')));

app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));


const users = [];
let error = '';


app.get('/login.hbs', (req, res) => {
    res.render('login');
});


app.post('/login.hbs', ({body}, res) => {
    const userExist = users.some(user => user.email === body.email);
    if (userExist) {
        error = 'User with this email exist';
        res.redirect('/error');
        return;
    }

    users.push({...body, id: users.length ? users[users.length - 1].id + 1 : 1});
    res.redirect('/users');
});

app.get('/users', ({query}, res) => {
    if (Object.keys(query).length) {
        let usersAray = [...users];
        if (query.city) {
            usersAray = usersAray.filter(user => user.city === query.city);
        }
        if (query.age) {
            usersAray = usersAray.filter(user => user.age === query.age);
        }

        res.render('users', {users: usersAray});
        return
    }
    res.render('users', {users});

});


app.get('/users/:userId', ({params}, res) => {
    const user = users.find(user => user.id === +params.userId);
    if (!user) {
        error = `User with ID ${params.userId} exist!`;
        res.redirect('/error');
        return;
    }
    res.render('userInfo', {user});
});

app.get('/signIn', (req, res) => {
    res.render('signIn');
})

app.post('/signIn', ({body}, res) => {
    let usersArray = [...users];
    let userId;
    if (usersArray.map(el => el.email).includes(body.login) && usersArray.map(el => el.password).includes(body.password)) {
        usersArray.forEach(user => user.email === body.login ? userId = user.id : 0)
        res.redirect(`users/${userId}`);
    }
});

app.get('/error', (req, res) => {
    res.render('error', {error});
});


app.use((req, res) => {
    res.render('notFound');
})


app.listen(5000, () => {
    console.log('server');
});

