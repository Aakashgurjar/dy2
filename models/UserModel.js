const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    resetPasswordExpires:{
        type: Date,
    },
    password: {
        type: String,
        required: true,
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post' 
    }]
}, {
    collection: 'users',
    timestamps: true
})

module.exports = mongoose.model('User', UserSchema);