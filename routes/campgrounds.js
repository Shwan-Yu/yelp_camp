var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

// INDEX
router.get("/", function(req, res){
    //get all campgrounds from db
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log("Something Wrong with getting data from db");
        } else{
            // send all the campgrounds data to the ejs file.
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    });
})

// CREATE
router.post("/",middleware.isLoggedIn, function(req, res){
    //get data from form and add to the array.
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description = req.body.description;
    // connect author to campground
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {
                        name : name,
                        price : price,
                        image : image, 
                        description: description,
                        author: author
    };
    
    // new campground save in the db.
    Campground.create(newCampground, function(err, campground){
        if(err){
            console.log(err);
        } else{
            // redirect back to campgrounds page.
            res.redirect("/campgrounds")
        }
    })
})

// NEW
router.get("/new",middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
})

// SHOW ROUTE
router.get("/:id", function(req, res) {
    //find the campground with provided ID
    var id  = req.params.id;
    Campground.findById(id).populate("comments").exec(function(err, campground){
        if(err){
            console.log(err);
        } else{
            //render show template with that campground.
            res.render("campgrounds/show", {campground : campground});
        }
    })
});

//EDIT CAMPGROUND
router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        res.render("campgrounds/edit", {campground: campground})
    })
});

//UPDATE CAMPGROUND
router.put("/:id",middleware.checkCampgroundOwnership, function(req, res){
    //find and update
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
        if(err){
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

//DELETE CAMPGROUND
router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/campgrounds");
       } else{
           res.redirect("/campgrounds");
       }
   })
});

//middleware logged in


module.exports = router;