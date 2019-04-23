const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const data = [
  {
    name: "Cloud's Rest",
    image:
      "https://images.pexels.com/photos/1376960/pexels-photo-1376960.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350&w=500",
    description: "bla bla bla"
  },
  {
    name: "Desert Mesa",
    image:
      "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350&w=500",
    description: "bla bla bla"
  },
  {
    name: "Canyon Floor",
    image:
      "https://images.pexels.com/photos/939723/pexels-photo-939723.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350&w=500",
    description: "bla bla bla"
  }
];

function seedDB() {
  // Remove all campgrounds
  Campground.remove({}, err => {
    if (err) {
      console.log(err);
    }
    console.log("removed campgrounds");
    data.forEach(seed => {
      Campground.create(seed, (err, campground) => {
        if (err) {
          console.log(err);
        } else {
          console.log("added a campground");
          // create a comment
          Comment.create(
            {
              text: "This place is great, but i wish there was internet",
              author: "Homer"
            },
            (err, comment) => {
              if (err) {
                console.log(err);
              } else {
                campground.comments.push(comment);
                campground.save();
                console.log("Created new commet");
              }
            }
          );
        }
      });
    });
  });
  // add a few campgrounds

  // add a few comments
}

module.exports = seedDB;
