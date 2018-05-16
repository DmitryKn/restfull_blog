const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//=== mongoose db
mongoose.connect("mongodb://localhost/blog_app");
var blogSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
})
var Campground = mongoose.model("Camp", blogSchema);

//===engine
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

//===get
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index")
})

//=== listen
app.listen(3000, () => {
  console.log("Server started. Port 3000");
})
