const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    
    firstname : {
        type : String,
        required : true
    },
    Father : {
        type : String,
        required : true
    },
    unique : {
        type : String,
        required : true,
        unique : true
    },
    contact : {
        type : String,
        required: true
    },
    Address : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    anumber : {
        type : Number,
        required : true
    },
    image : {
        type : String
    },
    user : {
        type : String
    },
    


}
, {
    timestamps : true
});






//Static functions




const Post = mongoose.model('Post', postSchema);

module.exports = Post;