const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true},
    email : {
        type : String,
        required : true,
        unique : [true, "Mail Already Registered"]
    },
    password : {
        type : String,
        required : true,
        minlength : 8
    },
})

const UserModel = mongoose.model("JournalUsers",UserSchema)

module.exports = UserModel