const express = require("express");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

// register
router.post("/register", async (req, res) => {
  const { password, email, confirmPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ msg: "User with the same email already exists" });

    if (confirmPassword !== password)
      return res.status(401).json({
        msg: " Confirm Password must be same as password",
      });

    const salt = await bcrypt.genSalt(10);

    const secPass = await bcrypt.hash(password, salt);
    const newUser = new User({
      email: email,
      password: secPass,
      username: req.body.username,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser); 
  } catch (err) {
    res.status(500).json(err);
  }
});
// login
router.post("/login", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        msg: "Please login with correct credentials",
      });

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return res.status(403).json({
        msg: "Invalid Password!",
      });
    const data = {
      id: user._id,
      username: user.username,
    };

    const token = jwt.sign(data, process.env.JWT_SECRET);

    const { password, ...others } = user._doc;

    res
      .cookie("ACCESS_TOKEN", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 8.64e7),
      })
      .status(200)
      .json({ ...others });
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all user

router.get("/", async (req, res) => {
  const user = await User.find({}).select("-password");
  res.status(200).json(user);
});

// getSingleUser

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return res.status(400).json({
      msg: "no user with this id found",
    });
  res.status(200).json(user);
});

// update user
router.put("/update/:id", verifyToken, async (req, res) => {
  if (req.user.id === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    if (req.body.email) {
      await User.updateOne({
        email: req.body.email,
      });
    }
    res.status(200).json("updated");
  } else {
    res.status(400).json("not updated");
  }
});
router.delete("/delete/:id", verifyToken, async (req, res) => {
  if (req.user.id === req.params.id) {
   await User.deleteOne()
    res.status(200).json("delete");
  } else {
    res.status(400).json("Still there");
  }
});

// follow user

router.put('/:id/follow_unfollow', verifyToken ,async(req, res) => {

  try {
    
 
  if(req.params.id !== req.user.id) {
 const user = await User.findOne({_id : req.params.id})
 const currentUser = await User.findOne({_id : req.user.id})

 if(!currentUser.following.includes(user._id)){
  await user.updateOne({
    $push : {followers : currentUser._id}
  })
 await currentUser.updateOne({
  $push : {
    following : user._id
  }
 })
 res.status(200).json("user followed")
} 
else{
  await user.updateOne({
    $pull : {followers : current._id}
  })
 await currentUser.updateOne({
  $pull : {
    following : user._id
  }
 })
 res.status(200).json("user unfollowed!")
}

  } } catch (error) {
    res.status(500).json(error.message)
  }
})

module.exports = router;
