const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
});

UserSchema.pre('save', async function(next){
    if(this.isModified('password')){
        var salt = bcrypt.genSaltSync(12);
        var hash = bcrypt.hashSync(this.password, salt); 
        this.password = hash;      
        next();
    }
});

UserSchema.methods.generateAuthToken = async function(){
    try{
        let token = await jwt.sign({_id:this._id},process.env.SECRETKEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch(err){
        console.log(`some problem occured ${err}`);
    }
}

const User = mongoose.model('User', UserSchema);
module.exports = User;