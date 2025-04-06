const express = require("express");
const app = express();
const moment = require("moment");
const axios = require("axios");

//Access token creation
async function getAccessToken(){
    const consumer_key = "ol32qnPvurnFEFd8o3Vm66YmfkAhkGS2b9whH313pPfTpYjH";
    const consumer_secret="A1ppJASdNlOc7sjZQhLHjUF651xtNOiG2JiAAR3CUGjzmpcTWhuzgUqEhBG44AFW";
    const url ="https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
    const auth= "Basic " +
    new Buffer.from(consumer_key + ":" + consumer_secret).toString("base64");
    
    try {
        const response = await axios.get(url,{
            headers:{
                Authorization:auth,
            },
        });
        const dataresponse = response.data;
        const accessToken = dataresponse.access_token;
        return accessToken;
    } catch (error) {
        throw error;
    }
}

//Access token endpoint
const AccessToken = (req,res)=>{
    getAccessToken().then((accessToken)=>{
        res.send("Your access token is " + accessToken);
    }).catch(console.log);
};

//stk push route
const StkPush =(req,res)=>{

    let PhoneNumber = req.body.phoneNo;
    let amount = req.body.amount;

    if(PhoneNumber.startsWith("0")){
         PhoneNumber = "254" + PhoneNumber.slice(1);
    }

getAccessToken().then((accessToken)=>{
    const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
    const auth= 'Bearer ' + accessToken;
    var timestamp = moment().format("YYYYMMDDHHmmss");
    const password = new Buffer.from(
        "174379" +
        "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" +
        timestamp
    ).toString("base64");
qwertyuiopasdfghjklxm;'.'
    axios.post(
        url,
        {
            BusinessShortCode: 174379,
            Password:password,
            Timestamp:timestamp,
            TransactionType:"CustomerPayBillOnline",
            Amount:amount,
            PartyA:PhoneNumber,
            PartyB:174379,
            PhoneNumber:PhoneNumber,
            CallBackURL:"https://mydomain.com/pat",
            AccountReference:"ECOMMERCE-BACKEND",
            TransactionDesc: "Mpesa daraja stk push for Ecommerce",
        },
        {
            headers:{
                Authorization:auth,
            },  
        }
    ).then((response)=>{
        res.send("Request is successiful done. Please enter your mpesa pin");
        console.log(response.data);
        
    }).catch((error)=>{
        console.log(error);
        res.status(500).send("Request has failed") 
    });
}).catch(console.log);
};

module.exports= {AccessToken,getAccessToken,StkPush};