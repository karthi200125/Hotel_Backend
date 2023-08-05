import express from 'express';
import { deleteUser, getAllUsers, getUser, updateUser } from '../controller/user.js';
import { verifytoken, verifyuser, verifyAdmin } from '../utils/veridyToken.js'; 

const router = express.Router();

router.get("/checkauthentication", verifytoken, (req, res, next) => {
  res.send("hello user! You are Logged in"); 
});

router.get("/checkUser/:id", verifyuser, (req, res, next) => {
  res.send("hello user! You Can Delete Your Account"); 
});

router.get("/checkAdmin/:id", verifyAdmin, (req, res, next) => {
  res.send("hello Admin! You Can Delete and Update All Accounts"); 
});

router.put("/:id",verifyuser, updateUser);
router.delete("/:id",verifyuser, deleteUser);
router.get("/:id", verifyuser,getUser);
router.get("/", verifyAdmin,getAllUsers);

export default router;
