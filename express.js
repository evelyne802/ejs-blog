import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let posts = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.render("home.ejs", { posts: posts });
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.post("/post", (req, res) => {
  posts.push({
    id: posts.length,
    title: req.body['title'],
    text: req.body['content']
  })  
  res.render("home.ejs", { posts: posts });
});

app.post("/editPost/:postId", (req, res) => {
  let id = parseInt(req.params.postId);
  let currentPost = posts[id];
  res.render("edit.ejs", { post: currentPost });
});


app.post("/updatePost/:postId", (req, res) => {
  let currentPost = posts[parseInt(req.params.postId)];
  currentPost.title = req.body['title'];
  currentPost.text = req.body['content'];
  res.render("home.ejs", { posts: posts });
});

app.post("/deletePost/:postId", (req, res) => {
  let id = parseInt(req.params.postId);
  posts = posts.filter(item => item.id !== id);
   res.redirect('/');

});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

