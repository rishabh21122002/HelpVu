const LocalStrategy = require('passport-local').Strategy;
const users = require('../models/users')
const hosp_details = require('../models/hosp_details')
const bcrypt = require('bcryptjs');


module.exports = function (passport) {
    passport.use('local', new LocalStrategy({ usernameField: 'num', passwordField: 'password' },
        (num, password, done) => {
            //match user
            users.findOne({ num: num })
                .then((user) => {

                    if (!user) {
                        return done(null, false, { message: 'that Phone Number is not registered' });
                    }
                    //match pass
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Password incorrect' });
                        }
                    })
                })
                .catch((err) => { console.log(err) })
        })

    )
    

    //hospital validation
    passport.use('hospital', new LocalStrategy({ usernameField: 'id', passwordField: 'password' },
        (id, password, done) => {
            // Match user
            hosp_details.findOne({
                id: id
            }).then(user => {
                if (!user) {

                    return done(null, false, { message: 'The Id is not registered' });
                }
                
                // Match password
                console.log(password,user.password)
                if (password === user.password) {
                    isMatch = true;
                }
                else {
                    isMatch = false;
                }

                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'pass incorrect' });
                }
            
            })
                .catch(err => console.log(err));
        })
    );


    passport.serializeUser((user, done) => {
        done(null, { _id: user._id, role: user.role });
    });

    passport.deserializeUser((login, done) => {
        if (login.role === 'user') {
            users.findById(login, function (err, user) {
                if (user)
                    done(null, user);
                else
                    done(err, { message: 'User not found' })
            });
        }
        else if (login.role === 'hospital') {
            hosp_details.findById(login, (err, admin) => {
                if (admin)
                    done(null, admin);
                else
                    done(err, { message: 'Hospital Id not found' })
            });
        }
        else {
            done({ message: 'No entity found' }, null);
        }
    });
}; 