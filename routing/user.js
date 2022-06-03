const express = require('express')
const router = express.Router();
const flash = require('connect-flash');
const mongoose = require('mongoose')
const passport = require('passport');
const users = require('../models/users')
const bcrypt = require('bcryptjs');


router.get('/login', (req, res) => {
    res.render('../views/login')
})

router.get('/register', (req, res) => {
    res.render('../views/register')
})

router.post('/register', (req, res) => {
    const { name, email, num, password, password2 } = req.body;

    const err = [];
    if (!name || !email || !num || !password || !password2) {
        err.push({ msg: 'Please fill in all the fields.' });
    }
    if (password !== password2) {
        err.push({ msg: 'Password do not match.' });
    }
    if (num.length != 10) {
        err.push({ msg: 'Please Enter a valid 10 digit Phone Number' });
    }
    if (password.length < 6) {
        err.push({ msg: 'Password should be atleast 6 character long.' });
    }

    if (err.length > 0) {

        res.render('../views/register', { name: name, email: email, num: num, err: err })
    }
    else {
        users.findOne({ num: num })
            .then(user => {
                if (user) {
                    err.push({ msg: 'Phone Number already exist' })
                    res.render('../views/register')
                }
                else {
                    const newUser = new users({
                        name,
                        email,
                        num,
                        password
                    });
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            // console.log(newUser);
                            newUser.save()
                                // req.flash('success_msg','You have now registered!')
                                .then(user => {
                                    res.redirect('/user/login');

                                })
                        })
                    );

                }
            })
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/bed',
        failureRedirect: '/user/login',
        failureFlash: true,
    })(req, res, next);

});

//logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'Now logged out');
    res.redirect('/');
})

module.exports = router;