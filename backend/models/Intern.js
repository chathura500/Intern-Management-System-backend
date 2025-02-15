const mongoose = require('mongoose');

const internSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    nameWithInitials: {
        type: String,
        required: true,
        trim: true
    },
    postalAddress: {
        type: String,
        required: true
    },
    nic: {
        type: String,
        required: true,
        unique: true
    },
    contactNumber: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/
    },
    district: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    preferredLanguage: {
        type: String,
        required: true,
        enum: ['English', 'Sinhala', 'Tamil']
    },
    password: {
        type: String,
        required: true
    }
} ,{ timestamps: true });

module.exports = mongoose.model('Intern', internSchema);
