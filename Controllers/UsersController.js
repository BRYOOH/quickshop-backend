const Users = require("../Models/Users.js").Users
const jwt = require("jsonwebtoken");

const UserSignin = async(req,res)=>{

    let check = await Users.findOne({email:req.body.email});

    if(check){
        return res.status(400).json({success:false, errors:"Existing User with the same emailID"});
    }

    let cart = {};
    for(let i=0 ; i<300 ; i++){
        cart[i]=0;
    }

    const User = new Users({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await User.save();

    const data = {
        User:{
            id:User.id
        }
    }

    const token = jwt.sign(data,"secret_token");
    res.json({success:true,token});

};

const userLogin = async (req,res)=>{
    
    const {email,password} = req.body;

    const user = await Users.findOne({email:email});
    if(!user){
        return res.status(400).json("User with email was not found");
    }

    const checkPas = await Users.findOne({password:password});
    if(!checkPas){
        return res.status(400).json("User password is incorect");
    }

    const data={
        User:{
            id:user._id,
            email:user.email,
        }
    }

    const token = jwt.sign({id:user._id},"secret_token");

    return res.json({success:true,data,token});

};

const fetchUser = async (req,res,next)=>{

    const token = req.header("auth-token");
    if(!token){
        res.status(401).json({errors:"You are not authenticated"});
    } else {
        try {
            const data= jwt.verify(token,"secret_token");
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({errors:"Please authenticate using valid token"});
        }
    }
}

module.exports={UserSignin,userLogin};