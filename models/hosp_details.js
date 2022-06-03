const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const hospSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    recovered: {
        type: Number,
        required: true
    },
    present: {
        type: Number,
        required: true
    },
    beds_vacant: {
        type: Number,
        required: true
    },
    beds_present: {
        type: Number,
        required: true
    },
    em_beds_vacant: {
        type: Number,
        required: true
    },
    em_beds_present: {
        type: Number,
        required: true
    },
    covid_test: {
        type: String,
        required: true
    },
    vaccination: {
        type: String,
        required: true
    },
    oxygen_req: {
        type: Number,
        required: true
    },
    oxygen_av: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'hospital'
    },
    tel: {
        type: Number,
        required: true
    },
});

const hosp_details = mongoose.model('hosp_details', hospSchema);
module.exports = hosp_details;