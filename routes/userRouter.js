

import express from 'express';

import { createuser, loginUser, getProfile } from '../controllers/userController.js'; 

const userrouter = express.Router();

userrouter.post("/register", createuser); 
userrouter.post("/login", loginUser); 
userrouter.get("/profile", getProfile); 

export default userrouter;