const mongoose = require('mongoose');

const HomeImageSchema = new mongoose.Schema({
    imageLink: { type: String, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('HomeImage', HomeImageSchema);
