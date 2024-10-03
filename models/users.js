const mongoose = require('mongoose')
const Post = require('./posts')


const UserSchma = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    mobile:{type:Number},
    password:{type:String},
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
    
})

UserSchma.virtual('posts',{
    ref:'Post',
    localField:'_id',
    foreignField: 'author', 
})

UserSchma.set('toObject', { virtuals: true });
UserSchma.set('toJSON', { virtuals: true });

const User = mongoose.model('User',UserSchma)

module.exports = User;  // Export the User model
