const mongoose = require('mongoose');
const validator = require('validator');

let UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: (value) => {
          return validator.isEmail(value)
        }
    },
    password: {
        type: String,
        required:true,
        validate: (value) => {
            return validator.isStrongPassword(value)
        }
    }
});

module.exports = mongoose.model('User', UserSchema);