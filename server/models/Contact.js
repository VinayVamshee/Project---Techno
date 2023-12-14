const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    Email: {
        type: String,
    },
    PhoneNo: {
        type: Number,
    },
    Location: {
        type: String,
    }
});

module.exports = mongoose.model('Contact', ContactSchema);