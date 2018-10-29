var express         = require("express"),
     app            = express(),
     bodyParser     = require("body-parser"),
     mongoose       = require("mongoose"),
     Campground     = require("./models/campground"),
     seedDB         = require("./seeds"),
     Comment        = require("./models/comment"),
     passport       = require("passport"),
     LocalStrategy  = require("passport-local"),
     User           = require("./models/user"),
     methodOverride = require("method-override"),
     flash          = require("connect-flash");
     
     
// requiring route   
var  campgroundRoutes   = require("./routes/campgrounds"),
     commentRoutes      = require("./routes/comments"),
     indexRoutes         = require("./routes/index");

mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// SEED THE DATABASE
//seedDB();

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Anything is ok",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp Camp On!");
});

// All RESTful routes
// Index    /dogs           GET     Display a list of dogs
// NEW      /dogs/new       GET     Displays form to make a new dog
// CREATE   /dogs           POST    Adds the new dog to DB and redirects somewhere else
// SHOW     /dogs/:id       GET     Shows info about one dog
// EDIT     /dogs/:id/edit  GET     Shows edit form for one dog
// UPDATE   /dogs/:id       PUT     Updates a dog and redirects somewhere else
// DESTROY  /dogs/:id       DELETE  Deletes a dog and redirects somewhere else