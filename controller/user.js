import User from '../models/User.js';

// UPDATE
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// DELETE
export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been Deleted");
  } catch (error) {
    next(error);
  }
};

// GET
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id); // Changed the variable name from User to user
    res.status(200).json(user); // Changed the variable name from User to user
  } catch (error) {
    next(error);
  }
};

// GET ALL
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find(); // Changed the variable name from Users to users
    res.status(200).json(users); // Changed the variable name from Users to users
  } catch (error) {
    next(error);
  }
};
