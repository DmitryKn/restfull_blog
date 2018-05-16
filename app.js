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
//index
app.get("/", (req, res) => {
  res.redirect("/blogs")
})
//all blogs
app.get("/blogs", (req, res) => {
  Blog.find({}, (err, blogs) => {
    if(err){
      console.log("ops error");
    } else {
      res.render("index", {blogs: blogs})
    }
  })
})
//new blog
app.get("/blogs/new", (req, res) => { // NEW item form
  res.render('new')
})
app.post("/blogs", (req, res) => {
  var data = req.body.blog
  Blog.create(data, (err, blog) => {
    if(err){
      console.log("ERROR");
    } else {
      res.redirect("/blogs")
    }
  })
})
//show id
app.get("/blogs/:id", (req, res) => {
  Blog.findById(req.params.id, (err, foundBlog) => {
    if(err){
      console.log("ERROR");
    } else {
      res.render("show", {blog: foundBlog});
    }
  })
})

//=== Listen
app.listen(3000, () => {
  console.log("Server started. Port 3000");
})
