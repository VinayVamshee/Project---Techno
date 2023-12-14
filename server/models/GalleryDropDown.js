const mongoose = require('mongoose');

const GalleryDropDownSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Link: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('GalleryDropDown', GalleryDropDownSchema);