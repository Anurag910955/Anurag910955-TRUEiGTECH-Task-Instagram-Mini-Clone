const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

//create post
router.post("/", auth, async (req, res) => {
  try {
    const post = await Post.create({
      imageUrl: req.body.imageUrl,
      caption: req.body.caption,
      user: req.user
    });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Post creation failed" });
  }
});

// like / unlike post
router.post("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.likes.includes(req.user)) {
      post.likes.pull(req.user);
    } else {
      post.likes.push(req.user);
    }

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Like failed" });
  }
});

// comment on post
router.post("/comment/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({
      user: req.user,
      text: req.body.text
    });

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Comment failed" });
  }
});

//feed posts
router.get("/feed", auth, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to load feed" });
  }
});


//user posts
router.get("/user/:id", auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.id })
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to load user posts" });
  }
});

//get post by id
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("user", "username")
      .populate("likes", "username") // ✅ LIKE LIST
      .populate({
        path: "comments.user",
        select: "username"
      });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    res.status(400).json({ message: "Invalid post ID" });
  }
});

module.exports = router;
