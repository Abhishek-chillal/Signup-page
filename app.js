const express = require("express");
const bodyParaser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const { render } = require("express/lib/response");
// const encrypt = require("mongoose-encryption");
// const md5 = require("md5");
const app = express();


app.use(express.static("public"));

app.set('view engine', 'ejs');
app.use(bodyParaser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/userDB2", { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const UserModel = new mongoose.model("Usercollection", userSchema);

app.get("/",function(req,res){
    res.render("home");
});

app.get("/login",function(req,res){
    res.render("login");
});

app.get("/login2",function(req,res){
    res.render("login2");
});

app.get("/register",function(req,res){
    res.render("register");
});

app.post("/register", function (req, res) {
    const newUer = new UserModel({
        email: req.body.username,
        password: req.body.password
    });

    newUer.save(function (err) {
        if (!err) {
            res.render("login");
        }
        else {
            console.log(err);
        }
    });
});


app.post("/login", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    UserModel.findOne({ email: username }, function (err, foundUser) {
        if (err) {
            console.log(err);
        }
        else {
            if (foundUser.password === password) {
                res.render("form");
            }
        }
    });
});


app.post("/login2", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    UserModel.findOne({ email: username }, function (err, foundUser) {
        if (err) {
            console.log(err);
        }
        else {
            if (foundUser.password === password) {
                res.render("secrets");
            }
        }
    });
});

app.listen(3000,function(){
    console.log("Server Started at port 3000");
});