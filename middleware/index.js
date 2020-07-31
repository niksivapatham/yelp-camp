let Campground = require("../models/campground");
let Comment = require("../models/comment");
let User = require("../models/user");
//all the middleware goes here

let middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    //Is user logged in?
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                //does user own campground
                console.log(foundCampground.author.id);
                console.log(req.user._id);
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
                    
            }
        }) 
    } else {
        res.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkProfileOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        User.findById(req.params.id, function(err, foundUser){
            if(err){
                req.flash("error", "User not found");
                res.redirect("back");
            } else {
                //does user own campground
                console.log(foundUser._id);
                console.log(req.user._id);
                if(foundUser._id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
                    
            }
        }) 
    } else {
        res.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    //Is user logged in?
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
                
            }
        }) 
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;