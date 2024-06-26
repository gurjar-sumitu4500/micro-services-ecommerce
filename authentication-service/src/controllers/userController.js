// userController.js

const User = require("../models/User");

// Controller function to get user profile
module.exports.getUserProfile = async (req, res) => {
  try {
    // Find user by ID
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports.checkAuth = async (req, res) => {
  try {
    return res.status(200).json({ msg: "Success" });
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
}

