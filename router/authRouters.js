const express = require("express");
const authRouter = express.Router();

const {registerGet , loginGet, loginPost,logout} = require("../controllers/authControllers.js")

authRouter.get('/register', registerGet);
authRouter.get('/login', loginGet);
authRouter.get('/logout', logout);
authRouter.post("/login", loginPost);

module.exports = authRouter;

// cmd + f
// cmd + option + enter