const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema({
    Link: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Notice', NoticeSchema);