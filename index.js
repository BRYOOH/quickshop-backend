const port = process.env.PORT || 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const moment = require("moment");
const multer = require("multer");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { UserSignin, userLogin, fetchUser, addToCart, removeFromCart, getCart } = require("./Controllers/UsersController");
const { ProductControllers, DeleteProduct, AllProducts, NewCollections, PopularInWomen } = require("./Controllers/ProductController");
const { AccessToken, StkPush } = require("./Controllers/MpesaController");

    dotenv.config();

    app.use(express.json());
    app.use(cors({
        origin: "https://quick-shop-zeta.vercel.app", // allow your frontend domain
        methods: ["GET", "POST", "DELETE", "PUT","OPTIONS"],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        exposedHeaders: ['Access-Control-Allow-Origin']
      }));

    app.options('*', cors({
        origin: "https://quick-shop-zeta.vercel.app",
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
    }));

    mongoose.connect(process.env.MONGOKEY).
    then(()=>console.log("MongoDB is running")).
    catch((err)=>console.log("MongoDB not running",err)
    )

 app.get("/",(req,res)=>{
    res.send("Express app is running!");
    var timestamp = moment().format("YYYYMMDDHHmm");
    console.log("Timestamp",timestamp);
    
 })

 cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret: process.env.API_SECRET
 });

//  const storage = multer.diskStorage({
//     destination:(req,file,cb) =>{
//         cb(null, "Images");
//     },
//     filename:(req,file,cb) =>{
//         console.log(file);
//         cb(null,Date.now()+path.extname(file.originalname));
//     }
//  }) 

    const storage = new CloudinaryStorage({
        cloudinary:cloudinary,
        params:{
            folder:'quick-shop',
            allowed_formats:[ 'jpg','jpeg','png'],
            transformation: [{width:500, height:500,crop: 'limit'}]
        }
    });

 const upload = multer({storage:storage});

 app.use("/Images",express.static("Images"));
 app.post("/upload",upload.single("image"),(req,res)=>{
    // const imageUrl = `https://quickshop-backend-2vgd.onrender.com/Images/${req.file.filename}`;
    res.json({ message: "Image uploaded successfully", image_url: req.file.path});
 });
 app.post("/signup",UserSignin);
 app.post("/login",userLogin);
 app.post("/addtocart",fetchUser,addToCart);
 app.post("/removefromcart",fetchUser,removeFromCart);
 app.get("/getCart",fetchUser,getCart);

 app.post("/addproduct",ProductControllers); 
 app.delete("/deleteproduct/:id",DeleteProduct);
 app.get("/allProducts",AllProducts);
 app.get("/newcollection",NewCollections);
 app.get("/popularinwomen",PopularInWomen);

 app.get("/accesstoken",AccessToken);
 app.post("/stkpush",StkPush);


 app.listen(port,(error)=>{
    if(!error){
        console.log("Server running on port " + port);
    }
    else{
        console.log("Server not running!!" + error);
        
    }
 })
