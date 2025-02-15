const mongoose = require('mongoose');

const BlacklistedTokenSchema = new mongoose.Schema({
    token: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, default: Date.now,
        expires: '2d' 
    } // Auto-delete after 2 days
});

module.exports = mongoose.model('BlacklistedToken', BlacklistedTokenSchema);
