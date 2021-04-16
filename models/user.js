const mongoose = require('mongoose');
const multer = require('multer');
const express = require('express');
const app = express();
const path = require('path');
const IMAGE_PATH = path.join('/uploads');
const userSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    // contact : {
    //     type : Number,
    //     required : true
    // },
    password : {
        type : String,
        required : true
    },
    
    image : {
        type : String,
        required : true
    },
}
, {
    timestamps : true
});










const User = mongoose.model('User', userSchema);

module.exports = User;