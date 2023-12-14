const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
    },
    ClassTeacherOf: {
        type: String,
        required: true,
    },
    PhoneNumber: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Teacher', TeacherSchema);