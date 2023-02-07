const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        default: false,
        required: true
    },
    contacts: {
        type: Array,
    },
    groups: {
        type: Array,
    }
})

module.exports = mongoose.model('user', userSchema);