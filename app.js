const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
require("./config/passport")(passport);
const flash = require('connect-flash');
const { ensureAuthenticated } = require("./config/auth")
const { ensureAuthenticated2 } = require("./config/auth2")
const hosp_details = require('./models/hosp_details');

// express app
const app = express();

//session cookies
app.use(session({
    secret: 'hawuiowu83uwhfwdonwu28928hwfpwamdwo',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//using flash
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

//connecting to mongodb
const dburl = 'mongodb+srv://helpvu:help1234@cluster0.dfauh.mongodb.net/helpvu?retryWrites=true&w=majority';
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected successfully...'))
    .catch((err) => console.log(err));

//middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//set view engine
app.set('view engine', 'ejs');

//listening for req
app.listen(3000, () => {
    console.log(`Server started at http://127.0.0.1:3000/`);
});

//routing

app.get('/', (req, res) => {
    res.render('index')
});

app.use('/user', require('./routing/user'))


app.use('/hospital', require('./routing/hospital'))

app.get('/map', (req, res) => {
    res.render('map.ejs');
})

app.get('/contact', (req, res) => {
    res.render('contact.ejs');
})

app.post('/contact', (req, res) => {
    res.redirect('/');
})

app.get('/about', (req, res) => {
    res.render('about.ejs');
})

app.get('/news', (req, res) => {
    res.render('news.ejs');
})

app.get('/bed', ensureAuthenticated, (req, res) => {
    res.render('bed_reg.ejs');
})

app.get('/status', (req, res) => {
    hosp_details.find({}, function (err, data) {
        if (err) throw err;
        res.render('hospitalstatus.ejs', { data });
    });
})

app.post('/search', (req, res) => {
    hosp_details.find({$or:[{id : req.body.text},{name : req.body.text.toUpperCase()}]}, function (err, data) {
        if (err) throw err;
        res.render('hospitalstatus.ejs', { data });
    });
})


// 
app.get('/updation/:id',ensureAuthenticated2 , (req, res) => {
    hosp_details.find({$or:[{id : req.params.id}]}, function (err, data) {
        if (err) throw err;
        // console.log(data);
        res.render('hospital_updation.ejs', { data });
    });

})

app.post('/updation/:name',(req,res)=>{
    var newvalues = { $set: {"beds_present": req.body.beds_present, "beds_vacant": req.body.beds_vacant,"em_beds_present":req.body.em_beds_present,"em_beds_vacant":req.body.em_beds_vacant,"covid_test":req.body.covid_test,"oxygen_req":req.body.oxygen_req,"oxygen_av":req.body.oxygen_av } };
    hosp_details.updateOne({name : req.params.name}, newvalues, function (err, data) {
        if (err) throw err;
        // console.log(data);
        res.redirect('/')
    });
})

app.post('/bed_allotment',(req,res)=>{
    hosp_details.find({}, function (err, data) {
        if (err) throw err;
        data.forEach(function(info){
            if(info.beds_vacant>0){
                res.render('bed_allotment.ejs', {info });
            }
        })
        res.render('no_bed.ejs');
    });
})

app.use('', (req, res) => {
    res.render('error404.ejs')
})