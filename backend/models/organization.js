const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const employeeSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
        
    },
}, {
    timestamps: true
});

const organizationSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
       
    },
    employees: [employeeSchema]
}, {
    timestamps: true
});

var Organizations = mongoose.model('Organization', organizationSchema);

module.exports = Organizations;