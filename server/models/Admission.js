const mongoose = require('mongoose');

const AdmissionSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Link: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Admission', AdmissionSchema);