const mongoose = require('mongoose');

const AcademicSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Link: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Academic', AcademicSchema);