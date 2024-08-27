const {User} = require("../Model/UserModel.js");
const jwt = require("jsonwebtoken");
const {createToken, handleErr} = require("../helpers/helpers.js");

module.exports.userGet = async function(req, res){
    try{
        let users = await User.find();
        res.status(200).json(users);
    }
    catch(err){
        res.status(500).json({
            message:"Something went wrong. Praying..."
        })
    }
}
module.exports.userPost = async function (req,res){
    let newUser = User({
        username : req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    newUser.save()
        .then(
            () => {
                let token = createToken(newUser.id);
                res.cookie("_token", token, {maxAge: 1000 * 60 * 60 * 24})
                 res.status(201).json({id : newUser.id});
            }
        ) 
        .catch(
            (err) => {
                // Object.values(err).forEach((element)=> console.log(element));
                // res.status(400).json({
                //     message: err.message
                // })
                let errs = handleErr(err);
                res.status(400).json({
                    errs
                });
            }
        )   
}
module.exports.getUserbyID = async function(req,res){
    User.findById(req.params.id)
    .then(document=>{
        res.status(200).json(document);
    })
    .catch( err => {
        res.status(404).json({
            message : "Not Found"
        });
    });
}
