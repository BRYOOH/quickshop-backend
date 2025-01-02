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
    id:id,
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
   await Product.deleteOne({id:req.params.id});
   console.log("Product has been deleted successifully");
   res.json({
      success:true,
      name:req.body.name,
   });
};

const AllProducts = async(req,res)=>{
  const allProducts= await Product.find({});
  console.log("All products have been fetched");
  res.send(allProducts)
}

const NewCollections = async (req,res)=>{
   let products = await Product.find({});
   let newprod = products.slice(1).slice(-8);
   console.log("New Collections have been fetched");
   res.send(newprod);
}

const PopularInWomen = async (req,res) =>{
   let products = await Product.find({category:"ladies"});
   let womenProd = products.slice(0,4);
   console.log("Popular in women has been fetched successifully");
   res.send(womenProd);
}

module.exports={ProductControllers,DeleteProduct,AllProducts,NewCollections,PopularInWomen};