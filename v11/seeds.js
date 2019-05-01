const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const data = [
  {
    name: "Cloud's Rest",
    image:
      "https://images.pexels.com/photos/1376960/pexels-photo-1376960.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore dolor eaque adipisci dignissimos excepturi nam, obcaecati fugit quod voluptatum ullam recusandae quo perferendis velit, dolorum molestias maiores illum non earum, veritatis alias ad reiciendis quas! Aliquid aut autem dolorem inventore nam architecto nihil excepturi consequatur est quasi impedit, nobis explicabo, tempora necessitatibus alias voluptatibus quas rerum minus eum veritatis exercitationem delectus nulla? Aperiam incidunt voluptate nesciunt explicabo deserunt accusamus, aliquam excepturi error quidem sed dolore placeat nulla doloremque ducimus aut. Obcaecati deserunt voluptates facilis illum quo sequi dicta sed consequuntur laboriosam nemo. Obcaecati voluptatem nisi sed eius. Placeat quos, maiores optio maxime dolorem consequuntur beatae, necessitatibus illo doloremque expedita praesentium corporis, quis facilis possimus sunt accusamus dolore deserunt impedit deleniti. Magnam dolore aspernatur qui magni explicabo odit sapiente optio asperiores iure veniam! Corrupti cumque illum porro culpa ipsam. Voluptas eaque veritatis consectetur velit. Cupiditate corrupti iure, quasi rerum numquam debitis."
  },
  {
    name: "Desert Mesa",
    image:
      "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore dolor eaque adipisci dignissimos excepturi nam, obcaecati fugit quod voluptatum ullam recusandae quo perferendis velit, dolorum molestias maiores illum non earum, veritatis alias ad reiciendis quas! Aliquid aut autem dolorem inventore nam architecto nihil excepturi consequatur est quasi impedit, nobis explicabo, tempora necessitatibus alias voluptatibus quas rerum minus eum veritatis exercitationem delectus nulla? Aperiam incidunt voluptate nesciunt explicabo deserunt accusamus, aliquam excepturi error quidem sed dolore placeat nulla doloremque ducimus aut. Obcaecati deserunt voluptates facilis illum quo sequi dicta sed consequuntur laboriosam nemo. Obcaecati voluptatem nisi sed eius. Placeat quos, maiores optio maxime dolorem consequuntur beatae, necessitatibus illo doloremque expedita praesentium corporis, quis facilis possimus sunt accusamus dolore deserunt impedit deleniti. Magnam dolore aspernatur qui magni explicabo odit sapiente optio asperiores iure veniam! Corrupti cumque illum porro culpa ipsam. Voluptas eaque veritatis consectetur velit. Cupiditate corrupti iure, quasi rerum numquam debitis."
  },
  {
    name: "Canyon Floor",
    image:
      "https://images.pexels.com/photos/939723/pexels-photo-939723.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore dolor eaque adipisci dignissimos excepturi nam, obcaecati fugit quod voluptatum ullam recusandae quo perferendis velit, dolorum molestias maiores illum non earum, veritatis alias ad reiciendis quas! Aliquid aut autem dolorem inventore nam architecto nihil excepturi consequatur est quasi impedit, nobis explicabo, tempora necessitatibus alias voluptatibus quas rerum minus eum veritatis exercitationem delectus nulla? Aperiam incidunt voluptate nesciunt explicabo deserunt accusamus, aliquam excepturi error quidem sed dolore placeat nulla doloremque ducimus aut. Obcaecati deserunt voluptates facilis illum quo sequi dicta sed consequuntur laboriosam nemo. Obcaecati voluptatem nisi sed eius. Placeat quos, maiores optio maxime dolorem consequuntur beatae, necessitatibus illo doloremque expedita praesentium corporis, quis facilis possimus sunt accusamus dolore deserunt impedit deleniti. Magnam dolore aspernatur qui magni explicabo odit sapiente optio asperiores iure veniam! Corrupti cumque illum porro culpa ipsam. Voluptas eaque veritatis consectetur velit. Cupiditate corrupti iure, quasi rerum numquam debitis."
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
