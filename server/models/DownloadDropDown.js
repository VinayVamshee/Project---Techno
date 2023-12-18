const mongoose = require('mongoose');

const DownloadDropDownSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Link: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('DownloadDropDown', DownloadDropDownSchema);