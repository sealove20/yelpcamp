let express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

Campground.create(
    {
        name: "Salmon Creek",
        image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
    }, (err, campground) => {
        if(err){
            console.log(err);
            console.log("deuruim")
        } else {
            console.log("NEWLY CREATED CAMPGROUND: ");
            console.log(campground);
        }
    });




let campgrounds = [
    {name: "Salmon Creek", image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"},
    {name: "Grenade Hill", image:"https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"},
    {name: "Mountain Goat's Rest", image:"https://images.pexels.com/photos/746758/pexels-photo-746758.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"},
    {name: "Salmon Creek", image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"},
    {name: "Grenade Hill", image:"https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"},
    {name: "Mountain Goat's Rest", image:"https://images.pexels.com/photos/746758/pexels-photo-746758.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"},
    {name: "Salmon Creek", image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"},
    {name: "Grenade Hill", image:"https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"},
    {name: "Mountain Goat's Rest", image:"https://images.pexels.com/photos/746758/pexels-photo-746758.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"}
]

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/campgrounds", (req, res) => {
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", (req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let newCampground = {name: name, image: image}
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", (req, res) => {
    res.render("new.ejs");
});

app.listen(3000, () => {
    console.log("The YelpCamp Server Has Started");
});