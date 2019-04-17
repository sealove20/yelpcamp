let express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// SCHEMA SETUP
let campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

let Campground = mongoose.model("Campground", campgroundSchema);

Campground.create(
  {
    name: "Granite Hill",
    image: "https://www.pexels.com/photo/six-camping-tents-in-forest-699558/",
    description:
      "This is a huge granite hill, no bathrooms. No water. Beautful granite!"
  },
  function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      console.log("NEWLY CREATED CAMPGROUND");
      console.log(campground);
    }
  }
);

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  // Get all campgrounds from db
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      consoe.log(err);
    } else {
      res.render("campgrounds", { campgrounds: allCampgrounds });
    }
  });
  // res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", (req, res) => {
  let name = req.body.name;
  let image = req.body.image;
  let newCampground = { name: name, image: image };
  // Create a new campground and save to DB
  Campground.create(newCampground, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      // redirect back to campgrounds page
      res.redirect("/campgrounds");
    }
  });
});

app.get("/campgrounds/new", (req, res) => {
  res.render("new.ejs");
});

app.get("/campgrounds/:id", (req, res) => {
  res.send("This will be the show page one day");
});

app.listen(3000, () => {
  console.log("The YelpCamp Server Has Started");
});
