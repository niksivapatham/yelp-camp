let mongoose  = require("mongoose");
let Campground = require("./models/campground");
let Comment = require("./models/comment");

let data = [
    {
        name: "Vale",
        image: "https://vignette.wikia.nocookie.net/rwby/images/3/3a/Kingdom_Maps_WoR_Vale.png/revision/latest/scale-to-width-down/620?cb=20190922121420",
        description: "Vale is one of the four Kingdoms of Remnant, located on the eastern end of the continent of Sanus, to the east of Vacuo and is considered a safe haven from the Grimm. Like the other three kingdoms, Vale is governed by a ruling council to represent and see to its people's needs"
    },
    {
        name: "Mistral",
        image: "https://vignette.wikia.nocookie.net/rwby/images/7/79/Kingdom_Maps_WoR_Mistral.png/revision/latest/scale-to-width-down/619?cb=20190922121413",
        description: "Mistral is one of the four Kingdoms of Remnant in RWBY[1], located on Anima, the far eastern continent of the world. Like the rest of the kingdoms, it is governed by a ruling council."
    },
    {
        name: "Vacuo",
        image: "https://vignette.wikia.nocookie.net/rwby/images/2/26/Kingdom_Maps_WoR_Vacuo.png/revision/latest?cb=20190922121415",
        description: "Vacuo is one of the four Kingdoms of Remnant, located on the western end of the continent of Sanus, to the west of Vale."
    }
]

function seedDB(){
    Campground.remove({}, function(err){
        /* if(err){
            console.log(err);
        } 
        console.log("removed campgrounds!");
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("created campground");
                    //create a comment
                    Comment.create(
                        {
                            text:"I love this kingdom!",
                            author: "Ruby Rose"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        })
                }
            })
        }); */
    });
    
}

module.exports = seedDB;