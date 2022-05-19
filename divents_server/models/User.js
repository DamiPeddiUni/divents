const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    auth_id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    type: { type: Number, required: true },
    profile_photo: { type: String, required: true},
    brief_presentation: { type: String, required: true},
    location : { type: String, required: false},
    profile_completed: { type: Boolean, required: true }
})

const User = mongoose.model('User', userSchema);
module.exports = User;