const mongoose = require('mongoose');

const CarouselImageSchema = new mongoose.Schema({
    Image: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('CarouselImage', CarouselImageSchema);