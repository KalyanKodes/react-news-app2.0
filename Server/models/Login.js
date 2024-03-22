    const mongoose = require('mongoose');

    const LoginSchema = new mongoose.Schema({
        userName:String,
        password: String
    })


    const LoginModel = mongoose.model('user' , LoginSchema);


    module.exports = LoginModel;