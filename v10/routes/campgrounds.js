const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const Comment = require("../models/comment");

//Index - show all campgrounds
router.get("/", (req, res) => {
  // Get all campgrounds from db
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      consoe.log(err);
    } else {
      res.render("campgrounds/index", {
        campgrounds: allCampgrounds
      });
    }
  });
  // res.render("campgrounds", {campgrounds: campgrounds});
});

//create - add new campground to DB
router.post("/", isLoggedIn, (req, res) => {
  let name = req.body.name;
  let image = req.body.image;
  let desc = req.body.description;
  let author = {
    id: req.user._id,
    username: req.user.username
  };
  let newCampground = {
    name: name,
    image: image,
    description: desc,
    author: author
  };
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

// new - show form to create new campgrund
router.get("/new", isLoggedIn, (req, res) => {
  res.render("campgrounds/new");
});

//show - shows more info about one campground
router.get("/:id", (req, res) => {
  // find the campground with provided ID
  Campground.findById(req.params.id)
    .populate("comments")
    .exec((err, foundCampground) => {
      if (err) {
        console.log(err);
      } else {
        console.log(foundCampground);
        // render show template with that campground
        res.render("campgrounds/show", { campground: foundCampground });
      }
    });
});

// middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", checkCampgroundOwnership, (req, res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    res.render("campgrounds/edit", { campground: foundCampground });
  });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", checkCampgroundOwnership, (req, res) => {
  // find and update the correct campground
  Campground.findByIdAndUpdate(
    req.params.id,
    req.body.campground,
    (err, updatedCampground) => {
      if (err) {
        res.redirect("/campgrounds");
      } else {
        res.redirect("/campgrounds/" + req.params.id);
      }
    }
  );
  // redirect somewhere(show page)
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndRemove(req.params.id, (err, campgroundRemoved) => {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      Comment.deleteMany({ _id: { $in: campgroundRemoved.comments } }, err => {
        if (err) {
          console.log(err);
        }
        res.redirect("/campgrounds");
      });
    }
  });
});

//middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function checkCampgroundOwnership(req, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, (err, foundCampground) => {
      if (err) {
        res.redirect("back");
      } else {
        //does user own the campground?
        if (foundCampground.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
}

module.exports = router;
