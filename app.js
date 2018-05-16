const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//=== MONGOOSE config
mongoose.connect("mongodb://localhost/blog_app");
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
})
var Blog = mongoose.model("blog", blogSchema);


//===APP config
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

//===ROUTES
app.get("/", (req, res) => {
  res.redirect("/blogs")
})
app.get("/blogs", (req, res) => {
  Blog.find({}, (err, blogs) => {
    if(err){
      console.log("ops error");
    } else {
      res.render("index", {blogs: blogs})
    }
  })
})

//=== Listen
app.listen(3000, () => {
  console.log("Server started. Port 3000");
})
