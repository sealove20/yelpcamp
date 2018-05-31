let express = require("express");
let app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/campgrounds", (req, res) => {
    let campgrounds = [
        {name: "Salmon Creek", image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"},
        
        {name: "Grenade Hill", image:"https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"},

        {name: "Mountain Goat's Rest", image:"https://images.pexels.com/photos/746758/pexels-photo-746758.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"}
    ]

    res.render("campgrounds", {campgrounds: campgrounds});
});

app.listen(3000, () => {
    console.log("The YelpCamp Server Has Started");
});