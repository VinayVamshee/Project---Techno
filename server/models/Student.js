const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
    },
    Class: {
        type: Number,
        required: true,
    },
    PhoneNumber: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Student', StudentSchema);