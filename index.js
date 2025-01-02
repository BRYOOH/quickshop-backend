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
const { ProductControllers, DeleteProduct, AllProducts, NewCollections, PopularInWomen } = require("./Controllers/ProductController");


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

 const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null, "Images");
    },
    filename:(req,file,cb) =>{
        console.log(file);
        cb(null,Date.now()+path.extname(file.originalname));
    }
 }) 
 const upload = multer({storage:storage});

 app.use("Images",express.static("Images"));

 app.post("/upload",upload.single("image"),(req,res)=>{
    res.send("Image has been uploaded");
 });
 app.post("/signup",UserSignin);
 app.post("/login",userLogin);
 app.post("/addproduct",ProductControllers);
 app.delete("/deleteproduct/:id",DeleteProduct);
 app.get("/allProducts",AllProducts);
 app.get ("/newcollection",NewCollections);
 app.get ("/popularinwomen",PopularInWomen);

 app.listen(port,(error)=>{
    if(!error){
        console.log("Server running on port " + port);
    }
    else{
        console.log("Server not running!!" + error);
        
    }
 })
