import User from "../models/User.js";
import bcrypt from 'bcrypt';
import { createError } from '../utils/erorr.js';
import jwt from 'jsonwebtoken'; 


export const Register = async (req, res, next) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const newuser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        isAdmin: req.body.isAdmin, 
      });
      await newuser.save();
      res.status(200).json("User has been created"); 
    } catch (error) {
      next(error);
    }
  };
  
export const Login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return next(createError(404, "Username Not Found!"));
    }

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect)
      return next(createError(400, "Password is incorrect"));

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET); 

    const { password, isAdmin, ...otherDetails } = user._doc;
    res.cookie("access_token", token, {
        httpOnly: true
      }).status(200).json({ ...otherDetails,isAdmin });
      
  } catch (error) {
    next(error);
  }
};
