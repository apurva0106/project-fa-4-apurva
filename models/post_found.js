const mongoose = require('mongoose');


const post_found = new mongoose.Schema({
    
    unique_name : {
        type : String,
        required : true
    },
    yname : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        reqired : true
    },
    phone : {
        type : Number,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    nps : {
        type : String,
        required : true
    },
    details : {
        type : String,
        required : true
    },
    image : {
        type : String,
        
    }
    


}
, {
    timestamps : true
});






//Static functions




const Post_found = mongoose.model('Post_found', post_found);

module.exports = Post_found;