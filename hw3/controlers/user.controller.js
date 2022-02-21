let {users} = require('../db');


module.exports = {
    getAllUsers: ({query}, res) => {
        if (Object.keys(query).length) {
            let userArray = [...users];

            if (query.city) {
                userArray = userArray.filter(user => user.city === query.city);
            }

            if (query.age) {
                userArray = userArray.filter(user => user.age === query.age);
            }

            res.render('users', {users: userArray});
            return;

        }

        res.render('users', {users});

    },


    getUserById: ({params, user}, res) => {
        res.render('userInfo', {user});
    },

    deleteUserById: ({params}, res) => {
        users = users.filter(user => user.id !== +params.userId);

        res.redirect('/users');
    }

};