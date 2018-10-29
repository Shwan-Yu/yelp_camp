var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment     = require("./models/comment");
    
var data = [
    {name: "Cary", 
    image:"https://image1.rent.com/imgr/1547e1df66bffa358f1c5b83986caa0d/480-280",
    description:"As you use the handout, try to keep three things in mind: First, this handout will be most effective if you use it as a tool. Every time you read this handout, read it along side another piece of writing (a journal article, a magazine, a web page, a novel, a text book, etc.). Locate a few nouns in the reading, and use the handout to analyze the article usage. If you practice a little bit at a time, this kind of analysis can help you develop a natural sensitivity to this complex system. Second, using articles correctly is a skill that develops over time through lots of reading, writing, speaking and listening. Think about the rules in this handout, but also try to pay attention to how articles are being used in the language around you. Simply paying attention can also help you develop a natural sensitivity to this complex system. Finally, although using the wrong article may distract a reader’s attention, it usually does not prevent the reader from understanding your meaning. So be patient with yourself as you learn."
    },
    {name: "Durham", 
    image:"https://static1.squarespace.com/static/5642bc3ae4b00c09aad507d7/t/58efb8ead1758e9c13641f2c/1537480632422/Duke-University%2C-Durham%2C-NC.jpg?format=1500w",
    description:"As you use the handout, try to keep three things in mind: First, this handout will be most effective if you use it as a tool. Every time you read this handout, read it along side another piece of writing (a journal article, a magazine, a web page, a novel, a text book, etc.). Locate a few nouns in the reading, and use the handout to analyze the article usage. If you practice a little bit at a time, this kind of analysis can help you develop a natural sensitivity to this complex system. Second, using articles correctly is a skill that develops over time through lots of reading, writing, speaking and listening. Think about the rules in this handout, but also try to pay attention to how articles are being used in the language around you. Simply paying attention can also help you develop a natural sensitivity to this complex system. Finally, although using the wrong article may distract a reader’s attention, it usually does not prevent the reader from understanding your meaning. So be patient with yourself as you learn."
    }
]

function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.remove({}, function(err) {
            // if(err){
            //     console.log(err);
            // }
            // console.log("removed comments!");
             //add a few campgrounds
            // data.forEach(function(seed){
            //     Campground.create(seed, function(err, campground){
            //         if(err){
            //             console.log(err)
            //         } else {
            //             console.log("added a campground");
            //             //create a comment
            //             Comment.create(
            //                 {
            //                     text: "This place is great, but I wish there was internet",
            //                     author: "Homer"
            //                 }, function(err, comment){
            //                     if(err){
            //                         console.log(err);
            //                     } else {
            //                         campground.comments.push(comment);
            //                         campground.save();
            //                         console.log("Created new comment");
            //                     }
            //                 });
            //         }
            //     });
            // });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;