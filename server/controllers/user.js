const User = require("../models/user");
const jwt = require("jsonwebtoken");


const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const getUser = await User.findById(id);
    if (!getUser) {
      return res.status(404).json({ message: "This user oes not exist !!" });
    }
    res.status(200).json(getUser);
  } catch (error) {
    res.status(404).json(error);
  }
};




const getAllUsers = async (req, res) => {
  try {
    const getUsers = await User.find({});
    res.status(200).json(getUsers);
  } catch (error) {
    res.status(404).json(error);
  }
};

const followUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { idFollowUser } = req.body;
    if (id !== idFollowUser) {
      const currentUser = await User.findById(id);
      const userFollow = await User.findById(idFollowUser);
      if (!currentUser.followings.includes(idFollowUser)) {
        await currentUser.updateOne({ $push: { followings: idFollowUser } });
        await userFollow.updateOne({ $push: { followers: id } });
        res.status(200).json({ user: currentUser });
      } else {
        return res.json({ message: "You already follow this user" });
      }
    } else {
      return res.json({ message: "You can not follow your self" });
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

const unFollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { idFollowUser } = req.body;
    if (id !== idFollowUser) {
      const currentUser = await User.findById(id);
      const userUnfollowing = await User.findById(idFollowUser);
      if (currentUser.followings.includes(idFollowUser)) {
        await currentUser.updateOne({ $pull: { followings: idFollowUser } });
        await userUnfollowing.update({ $pull: { followers: id } });
        res.status(200).json({ user: currentUser });
      } else {
        return res.json({ message: "You already unfllow this user" });
      }
    } else {
      return res.json({ message: "You can not unfollow your self" });
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const getUserAndUpdate = await User.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    if (!getUserAndUpdate) {
      return res.status(404).json({ message: "This user does not exist" });
    }
    const token = jwt.sign(
      { id: getUserAndUpdate._id, userName: getUserAndUpdate.userName },
      "JWT_SECRET",
      { expiresIn: "30d" }
    );
    res.status(200).json({ user: getUserAndUpdate, token });
  } catch (error) {
    res.status(404).json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const getUserAndDelete = await User.findByIdAndDelete(id);
    if (!getUserAndDelete) {
      return res.status(404).json({ message: "This user does not exist" });
    }
    res.json({ message: "The User has been deleted" });
  } catch (error) {
    res.status(404).json(error);
  }
};



module.exports = {
  getUser,
  getAllUsers,
  followUser,
  unFollowUser,
  updateUser,
  deleteUser,
};
