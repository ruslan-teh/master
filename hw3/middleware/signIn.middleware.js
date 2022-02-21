const users = require('../db/users');


module.exports = {
    checkUserAuth: (req, res, next) => {
        try {
            const {email, password} = req.body;


            const user = users.find(user => user.email === email && user.password === password);

            if (!user) throw new Error('Wrong Password');

                req.user = user;
                next();


        } catch ({massage}) {
            res.redirect(`/error?error=${massage}`);

        }
    }
};