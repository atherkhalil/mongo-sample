// Initializing the libraries
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Post = require("./models/Post");

// Use 'Express' methods
const app = express();
app.use(express.json({ extended: true }));

// Connecting to the database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected!");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
connectDB();

// Deploying the Routes

// Default Route
app.get("/", (req, res) => {
  return res.send("Default Route!");
});

// Fetch all the Posts in the database
app.get("/get_all", async (req, res) => {
  try {
    const fetchPosts = await Post.find();
    return res.json(fetchPosts);
  } catch (err) {
    console.log(err);
    return res.json({ Error: err });
  }
});

// Fetch a Post by ID
app.get("/find/:id", async (req, res) => {
  try {
    const fetchPost = await Post.findById(req.params.id);
    return res.json(fetchPost);
  } catch (err) {
    console.log(err);
    return res.json({ Error: err });
  }
});

// Add Post to the database
app.post("/post", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    desc: req.body.desc,
  });
  try {
    const savedPost = await post.save();
    return res.json(savedPost);
  } catch (err) {
    console.log(err);
    return res.json({ Error: err });
  }
});

// Update a Post in the database
app.patch("/update", async (req, res) => {
  try {
    const patchPost = await Post.updateOne(
      { _id: req.body.id },
      {
        $set: {
          desc: req.body.desc,
        },
      }
    );
    return res.json(patchPost);
  } catch (err) {
    console.log(err);
    return res.json({ Error: err });
  }
});

// Delete a Post by ID
app.delete("/delete/:id", async (req, res) => {
  try {
    const deletePost = await Post.remove({ _id: req.params.id });
    return res.json(deletePost);
  } catch (err) {
    console.log(err);
    return res.json({ Error: err });
  }
});

// Getting the server Live!
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
