const { Product } = require("../Models/Product").Products;

const ProductControllers = async(req,res) =>{
 const product = Users.find({});
 let id;

 if(product.length> 0){
    let last_array = product.slice(-1);
    let last_product = last_array[0];
    id=last_product.id + 1;
 }
 else{
    id=1;
 }

 const Products = new Product({
    id:req.body.id,
    name:req.body.name,
    image:req.body.image,
    new_price:req.body.new_price,
    old_price:req.body.old_price,
    category:req.body.category,
    date:req.body.date
 });
 console.log(Products);
 
 await Products.save();
 res.json({
    success:true,
    name:req.body.name,
 })
};


module.exports={ProductControllers}