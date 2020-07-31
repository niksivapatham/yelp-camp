let express = require("express");
let router = express.Router();
let passport = require("passport");
let User = require("../models/user");
const campground = require("../models/campground");
let middleware = require("../middleware");
const { update } = require("../models/comment");


router.get("/", function(req, res){
    res.render("landing");
});


// =======================
// AUTH ROUTES
router.get("/register", function(req, res){
    res.render("register", {page:"register"});
})

router.post("/register", function(req, res){
    let newUser = new User(
        {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            avatar: req.body.avatar,
            bio: req.body.bio
        });
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp" + user.username);
            res.redirect("/campgrounds");
        })
    });
});

//SHOW login form
router.get("/login", function(req, res){
    res.render("login", {page:'login'});
})

//handle login logic
router.post("/login", passport.authenticate("local", {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }) ,function(req, res){
});

//logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/campgrounds");
});

//USER PROFILE
router.get("/users/:id", function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            req.flash("error", "Something went wrong");
            return res.redirect("/");
        } 
        campground.find().where('author.id').equals(foundUser._id).exec(function(err, campgrounds){
            if(err){
                req.flash("error", "Something went wrong");
                return res.redirect("/");
            }
            res.render("users/show", {user: foundUser, campgrounds: campgrounds});
        })
        
    })
})

//EDIT USER PROFILE
router.get("/users/:id/edit", middleware.checkProfileOwnership, function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        res.render("users/edit", {user: foundUser});
    })
})

//USER UPDATE
router.put("/users/:id", middleware.checkProfileOwnership, function(req, res){
    console.log("Got to here");
    User.findById(req.params.id, req.body.user, function(err, updateProfile){
        if(err){
            console.log("failed");
            res.redirect("back");
        } else {
            updateProfile.username = req.body.user.username.trim();
            updateProfile.firstName = req.body.user.firstName.trim();
            updateProfile.lastName = req.body.user.lastName.trim();
            updateProfile.email = req.body.user.email.trim();
            updateProfile.avatar = req.body.user.avatar.trim();
            updateProfile.email = req.body.user.email.trim();
            updateProfile.bio = req.body.user.bio.trim();

            updateProfile.save(function(err){
                if(err){
                    console.log(err);
                }
            })

            res.redirect("/users/" + req.params.id);
        }
        
    })
})


module.exports = router;