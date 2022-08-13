const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    googleId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: false,
    }
});
module.exports = mongoose.model('User', userSchema);