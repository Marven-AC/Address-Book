const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Currency = mongoose.Types.Currency;

const commentSchema = new Schema({
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
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
    }
}, {
    timestamps: true
});

const Organization = new Schema({
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
        unique: true
    },
    employees: [employee]
}, {
    timestamps: true
});

var Organizations = mongoose.model('Organization', organizationSchema);

module.exports = Organizations;