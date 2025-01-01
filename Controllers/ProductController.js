const  Product = require("../Models/Product").Products;

const ProductControllers = async(req,res) =>{
 let product = await Product.find({});
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

const DeleteProduct = async (req,res) =>{
   await Product.findOneAndDelete({id:req.body.id});
   console.log("Product with id " + id + " has been deleted successifully");
   res.json({
      success:true,
      name:req.body.name
   })
}

const AllProducts = async(req,res)=>{
  const allProducts= await Product.find({});
  console.log("All products have been fetched");
  res.send(allProducts)
}

module.exports={ProductControllers,DeleteProduct,AllProducts}