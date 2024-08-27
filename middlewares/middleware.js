const jwt = require("jsonwebtoken");
const {User} = require("../Model/UserModel.js");
const authenticated = function (req,res,next){
    let token = req.cookies._token;
    if(!token){
        res.redirect("/login");
        return;
    }
    jwt.verify(token,process.env.JWT_SECRET, (err,token)=>{
        if(err){
            res.redirect("/login");
            return;
        }
        next();
    })
}
const adminOnly = function (req,res,next){
    let token = req.cookies._token;
    if(!token){
        res.redirect("/login");
        return;
    }
    jwt.verify(token,process.env.JWT_SECRET, async (err,token)=>{
        if(err){
            res.redirect("/login");
           return;
        }
        let user = await User.findById(token.id);
        if(user && user.role != "admin"){
            res.redirect("/login");
           return;
        }
        res.locals.user = user;
        next();
    })
}
const injectUser = async function(req, res, next){
    let token = req.cookies._token;
    if(!token){
        next();
        return;
    }
    jwt.verify(token,process.env.JWT_SECRET, async (err,token)=>{
        if(err){
           next();
           return;
        }
        let user = await User.findById(token.id);
        // if(user){
        //     res.locals.user = user;
        // }
        if(user && user.role != "user"){
            return;
        }res.locals.user = user;
        next();
    })
}
module.exports = {injectUser , authenticated ,adminOnly};