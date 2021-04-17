const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8018;
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const path = require('path');
// const MongoStore =  require('connect-mongo')(session);
const User = require('./models/user');
const Post = require('./models/post');
const multer = require('multer');





const user_control = require('./controller/user_controller');
const { mongo } = require('mongoose');
const Post_found = require('./models/post_found');

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('assets'));
app.use("/uploads", express.static(__dirname + '/assets/uploads'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(session({
    name : 'project',
    secret : 'maaKabharosa',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge:(1000*60*100)
    },
    // store : new MongoStore({
    //     mongooseConnection : db,
    //     autoRemove : 'disabled'
    // },
    // function(err) {
    //     console.log(err || 'connect mongodb setup ok');
    // })
}));

app.use(passport.initialize());
app.use(passport.session());



//image storage system
var Storage = multer.diskStorage({
    destination : "assets/uploads",
    filename:(req,file,cb) => {
        cb(null,file.fieldname + "_"+Date.now() + path.extname(file.originalname))
    }
})
//middleware
var upload = multer({
    storage : Storage
}).single('image');
// app.use(passport.setAuthenticatedUser());

// rendering the home page
app.get('/', function(req, res) {
    Post.find({}, function(err, uploads) {
        if(err) {
            console.log(err);
        }
        res.render('home', 
            {
                post_list : uploads,
                user : req.user
            }        
        );
    } )
});
// rendering sign up form
app.get('/sign-up', function(req, res) {
    return res.render('signup');
})
// submitting form
app.post('/submit-signup', upload,function(req, res) {
    User.create({
        firstname : req.body.firstname,
        username : req.body.username,
        password : req.body.password,
        contact : req.body.contact,
        image : req.file.filename,


    }, function(err, user) {
        if(err) {
            console.log('error in creating the user ', err);
            return;
        }
        console.log(user);
        Post.find({}, function(err, upload) {
            if(err) {
                console.log('error in loading');
            }
            res.render('home',{
                post_list : upload,
                user : req.user
            }
            )
        })
        
    })
})

// rendering the user profile
//rendering the signin page
app.get('/sign-in', function(req,res) {
    return res.render('signin');
})
// signing in
app.post('/submit-signin',passport.authenticate(
    'local',
    {
     failureRedirect : '/sign-in'
    },) ,user_control.createSession 
);

app.get('/sign-out', function(req, res) {
    req.logOut();

    return res.redirect('/');
})

//rendering post form
app.get('/create-post',passport.checkAuthentication, function(req, res) {
    return res.render('addprofile');
});

// Submitting the data for post
app.post('/submit-profile',upload, passport.checkAuthentication, function(req, res) {
    Post.create({
        firstname : req.body.firstname,
        Father : req.body.Father,
        unique : req.body.unique,
        contact : req.body.contact,
        Address : req.body.Address,
        city : req.body.city,
        anumber : req.body.anumber,
        user : req.user._id,
        image : req.file.filename,
    },
    function(err, post) {
        if(err) {
            console.log('error');
            return;
        }
        console.log(post);
        Post.find({}, function(err, upload) {
            if(err) {
                console.log('err');
            }
            res.render('home', {
                post_list : upload,
                user : req.user
            })
        })
    });

})




//rendering my profile
app.get('/myprofile',passport.checkAuthentication, function(req, res) {
    User.find({_id : req.user._id}, function(err, upload1) {
        console.log(upload1);
        return res.render('myProfile', {
            user : upload1
        });
    })
    
    
})
//rendering my posts 
app.get('/myPosts',passport.checkAuthentication, function(req, res) {
    Post.find({user : req.user._id}, function(err, data) {
        if(err) {
            console.log(err);
        }
        else {
            return res.render('myPosts', {
                user_pos : data
            }
            
            )
        }
    })
})



// rendering person found form 
app.get('/postFound', function(req, res) {
    
     
            return res.render('personF')
        
    });
//submitting post found form
app.post('/person-found-form',upload,  function(req, res) {
    Post_found.create({
        unique_name : req.body.unique_name,
        yname : req.body.yname,
        email : req.body.email,
        phone : req.body.phone,
        address : req.body.address,
        nps : req.body.nps,
        details : req.body.details,
        image : req.file.filename,
    },
    function(err, post) {
        if(err) {
            console.log(err);
        }
        else {
            console.log(post);
        }
    });
})
//Starting the server
app.listen(port, function(err) {
    if(err) {
        console.log('error in running the server', err);
    }
    console.log('server is running on port ', port);
    console.log('server is running on port ', port);
})
