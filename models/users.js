const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name : {
        type: String,
        required : true
    },
    email : {
        type: String,
        required : true
    },
    num : {
        type: Number,
        required : true
    },
    password : {
        type: String,
        required : true
    },
    role:{
        type: String,
        default: 'user' //Manage respectively
        },
})

const users = mongoose.model('user_detail',userSchema);
module.exports = users;