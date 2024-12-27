const {mongoose } = require("mongoose");

const Users = mongoose.model("Users",{

    id:{
        type:Number,
    }, 
    username:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
});

module.exports={Users}