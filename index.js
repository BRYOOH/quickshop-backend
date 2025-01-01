const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const dotenv = require("dotenv");
const { UserSignin, userLogin } = require("./Controllers/UsersController");
const { ProductControllers, DeleteProduct, AllProducts } = require("./Controllers/ProductController");

    dotenv.config();

    app.use(express.json());
    app.use(cors());

    mongoose.connect("mongodb+srv://brianmuchira001:Muriukis@cluster0.c8atalq.mongodb.net/QuickShop").
    then(()=>console.log("MongoDB is running")).
    catch((err)=>console.log("MongoDB not running",err)
    )

 app.get("/",(req,res)=>{
    res.send("Express app is running!");
 })

 app.post("/signup",UserSignin);
 app.post("/login",userLogin);
 app.post("/addproduct",ProductControllers);
 app.delete("/deleteproduct",DeleteProduct);
 app.get("/allProducts",AllProducts);

 app.listen(port,(error)=>{
    if(!error){
        console.log("Server running on port " + port);
    }
    else{
        console.log("Server not running!!" + error);
        
    }
 })
