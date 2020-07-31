let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");

let UserSchema = new mongoose.Schema({
    usernme: String,
    password: String,
    avatar: String,
    firstName: String,
    lastName: String, 
    email: String,
    bio: String
});
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);