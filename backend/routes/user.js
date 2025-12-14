const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

//follow user
router.post("/follow/:id", auth, async (req, res) => {
  try {
    if (req.user === req.params.id) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    await User.findByIdAndUpdate(
      req.user,
      { $addToSet: { following: req.params.id } }
    );

    await User.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { followers: req.user } }
    );

    res.json({ message: "Followed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Follow failed" });
  }
});

//unfollow user
router.post("/unfollow/:id", auth, async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user,
      { $pull: { following: req.params.id } }
    );

    await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { followers: req.user } }
    );

    res.json({ message: "Unfollowed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Unfollow failed" });
  }
});

//get user profile
router.get("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("followers following", "username");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(400).json({ message: "Invalid user ID" });
  }
});

//search users
router.get("/search/:query", auth, async (req, res) => {
  try {
    const users = await User.find({
      username: { $regex: req.params.query, $options: "i" }
    }).select("username");

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
});

module.exports = router;
