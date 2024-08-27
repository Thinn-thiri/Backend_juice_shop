const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');
const ejs = require("ejs");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express();
const dotenv = require("dotenv");
const { everyMinute } = require("./services/cronServices");
dotenv.config();

const { db_connect } = require("./database/dbConnect");
const {injectUser} = require("./middlewares/middleware.js")
const {homeGet} = require("./controllers/authControllers.js")


const userRouter = require("./router/userRouters");
const authRouter = require("./router/authRouters");
const productRouter = require("./router/productRouters")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cookieParser());

app.set("port", 3000);

app.set("view engine", "ejs");

app.use("/static",express.static(`${__dirname}/publics`));

app.set('views', path.join(__dirname, 'views'));


app.use("*",injectUser);
app.get('/', homeGet);
app.use("/", userRouter);
app.use("/", authRouter);
app.use("/", productRouter);
app.get("/run-job", (req,res)=>{
    everyMinute.fireOnTick();
    res.status(200).json({
        data : "running"
    })
})

app.get("/set-cookies", (req,res)=>{
    res.cookie("test-cookie", "test cookie value", {maxAge : 1000 * 60 * 60 * 24, httpOnly:true});
    res.cookie("test-cookie-https", "test cookie value", {maxAge : 1000 * 60 * 60 * 24, httpOnly:false});
    res.send("You got the cookie")
}) 
app.get("/get-cookies", (req,res)=>{
    let cookies = req.cookies;
    res.json({cookies});
})
app.get("/get-token",(req,res)=>{
    let payload = {
        id : 123
    };
    let token = jwt.sign(payload, process.env.JWT_SECRET);
    res.send({token});
})
app.post("/test-token", (req,res)=>{
    let test_token = req.body.token;
    jwt.verify(test_token, process.env.JWT_SECRET, (err,payload)=>{
        if(err){
            res.send({ message : "Error"});
            return;
        }
        res.send({payload});
    })
})

// app.get('/', (req,res)=>{
//     res.send("Hello");
// });
// app.get("/product",(req,res)=>{
//     res.render('product',{
//         page_title:"product"
//     })
// });

db_connect().then(
    ()=>{
        app.listen(app.get("port"),()=>{
            console.log(`Server is running at localhost:${app.get("port")}`)
        });
    }
).catch(
    err => {
        console.log("Can't connect to db.")
    }
)
