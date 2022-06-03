const express = require('express')
const router = express.Router();
const flash = require('connect-flash');
const mongoose = require('mongoose')
const passport = require('passport');
const hosp_details = require('../models/hosp_details')
const bcrypt = require('bcryptjs');

router.get('/login', (req, res) => {
    res.render('../views/hospital_login')
})

// router.get('/register', (req, res) => {
//     res.render('../views/hospital_reg')
// })

// router.post('/register', (req, res) => {
//     const { id, password, name, recovered, present, beds_vacant, beds_present, em_beds_vacant, em_beds_present, covid_test, vaccination, oxygen_req, oxygen_av, address } = req.body;
//     console.log(req.body)
//         const obj1 = new hosp_details({
//             id: id,
//             password:password,
//             name: name,
//             recovered: req.body.recovered,
//             present: present,
//             beds_vacant: beds_vacant,
//             beds_present: beds_present,
//             em_beds_vacant: em_beds_vacant,
//             em_beds_present: em_beds_present,
//             covid_test: covid_test,
//             vaccination: vaccination,
//             oxygen_req: oxygen_req,
//             oxygen_av: oxygen_av,
//             address: address,
//         });
//         console.log(obj1);
//         bcrypt.genSalt(10, (err, salt) =>
//             bcrypt.hash(obj1.password, salt, (err, hash) => {
//                 // if (err) throw err;
//                 obj1.password = hash;
//                 obj1.save()
//                     .then(user => {
//                         res.redirect('/hospital/login');

//                     })
//             })
//         );

//     });

    router.post('/login', (req, res, next) => {
        passport.authenticate('hospital', {
            successRedirect: `/updation/${req.body.id}`,
            failureRedirect: '/hospital/login',
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