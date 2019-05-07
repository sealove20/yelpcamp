require("dotenv").config();
// heroku config:set GEOCODER_API_KEY=your-key-here
let express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  flash = require("connect-flash"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  methodOverride = require("method-override"),
  Campground = require("./models/campground"),
  Comment = require("./models/comment"),
  User = require("./models/user"),
  seedDB = require("./seeds"),
  connectionString =
    "mongodb+srv://yelpadmin:yelpadmin@yelpcamp-csa8k.mongodb.net/test?retryWrites=true";
 
// requiring routes
const commentRoutes = require("./routes/comments"),
  campgroundRoutes = require("./routes/campgrounds"),
  indexRoutes = require("./routes/index");
// seedDB();//seed the database
app.use(flash());
// PASSPORT CONFIGURATION
app.use(
  require("express-session")({
    secret: "trololo bololo ha ha",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose
  .connect(connectionString, { useNewUrlParser: true })
  .then(() => {
    console.log("Connect to DB!");
  })
  .catch(err => {
    console.log("ERROR", err.message);
  });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments/", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(3000, () => {
  console.log("The YelpCamp Server Has Started");
});
