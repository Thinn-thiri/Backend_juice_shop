const express = require("express");
const userRouter = express.Router();

const {userGet, userPost, getUserbyID} = require("../controllers/userControllers")
userRouter.get("/users", userGet);
userRouter.post("/users", userPost);
userRouter.get("/users/:id", getUserbyID);

module.exports = userRouter;