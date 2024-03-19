var mongoose = require('mongoose');

module.exports = mongoose.model('Assn8', {
    full_name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    imagePath: { type: String } // Add this field for storing image path
});