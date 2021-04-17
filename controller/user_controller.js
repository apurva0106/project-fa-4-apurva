const User = require('../models/user');
const express = require('express');
const Post = require('../models/post');
const upload = require('../models/user');
module.exports.createSession = function(req, res) {
    Post.find({}, function(err, upload) {
        if(err) {
            console.log('err');
        }
        res.render('home', 
        {
            post_list : upload,
            user : req.user
            
        })
    })
}
// const uploadFile = async(req, res) => {
//     try {
//         await upload(req, res);
//         console.log(req.file);
//         if(req.file == undefined) {
//             return res.send('you must select')
//         }
//         return res.send('file has been uploaded');
//     }
//     catch(error) {
//         console.log(error);
//     }
// };
// module.exports = {
//     uploadFile : uploadFile
// };
module.exports.profile = function(){console.log('profile visible')};