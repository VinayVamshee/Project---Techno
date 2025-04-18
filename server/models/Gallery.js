const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
    MainImage: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
    },
    Link: {
        type: String,
    },
    YoutubeLink: {
        type: String,
    }
});

module.exports = mongoose.model('GalleryCard', GallerySchema);
