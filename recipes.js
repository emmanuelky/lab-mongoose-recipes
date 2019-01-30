const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

//Iteration 1

const recipeSchema = new Schema({
  title: { type: String, required: true },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: { type: Array },
  cousine: { type: String, required: false },
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: "April 12 2018" }
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;

//Iteration 2
Recipe.create({
  title: "Emmanuel",
  level: "Easy Peasy",
  ingredients: ["cookies", "spices", "onions"],
  cousine: "zebra",
  dishType: "Breakfast",
  image: "https://images.media-allrecipes.com/images/75131.jpg",
  duration: 0,
  creator: "Emmanueliyere",
  created: "January 30, 2019"
})

  .then(() => Recipe.insertMany(data))
  .catch(err => {
    console.log("An error happened:", err);
  });

//Iteration 3
Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 }).then(
  recipe => {
    console.log("Updated successfully!");
  }
);

//Iteration 4
Recipe.deleteOne({ title: "Carrot Cake" }).then(recipe => {
  console.log("Deleted successfully!");

});

//Iteration 5
mongoose.connection.close(function(){ 
  console.log("yea, it's closed. Sick");
});
