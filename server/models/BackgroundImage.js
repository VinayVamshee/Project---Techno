const mongoose = require('mongoose');

const backgroundImageSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true }
});

const BackgroundImage = mongoose.model('BackgroundImage', backgroundImageSchema);

module.exports = BackgroundImage;
