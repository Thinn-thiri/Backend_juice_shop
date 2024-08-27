const {User} = require("../Model/UserModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {createToken} = require("../helpers/helpers.js");

module.exports.registerGet = function (req,res){
    res.render("register",{
        page_title : "Register"
})}
module.exports.loginGet = function (req, res){
    res.render("login",{
        page_title : "Log In"
    });
}
module.exports.loginPost = async function (req, res){
        let email = req.body.email;
        let password = req.body.password;
        let user = await User.findOne({ email : email});
        // console.log(user.email);
        // console.log(user.password + '|'+ password);
        if(!user){
            res.status(404).json({
                "errors":{
                    "email":"email not found"
                }
            });
            return;
        }
        let check_password = await bcrypt.compare(password,user.password);
        if(!check_password){
            res.status(404).json({
                "errors":{
                    "password":"wrong password"
                }
            });
            return;
        }
        let token = createToken(user.id);
        res.cookie("_token",token,{maxAge:1000*60*60*24});
        res.status(200).json({"data":"ok"});   
}
module.exports.homeGet = function (req, res){
    res.render("home",{
        welcomeString: "Hi this is home page",
        page_title : "Home"
    });
}
module.exports.logout = function (req, res){
    res.clearCookie("_token");
    res.redirect("/");
}

