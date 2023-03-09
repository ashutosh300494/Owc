import { json, Router } from "express";
import User from "../models/User.js";
import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken';
// Notes for encryption
// const crypto = require('crypto-js');
// encript password  
//     const encrptPassword = ''+ crypto.SHA256(`${password}`)
import sendmail from '../mailer.js';
const signature = "@svt#4mx&5ccd81961#chu";
let userdata;


const route=Router();

//FindbyEmail
route.post('/Changepass', (req, res) => {
    console.log(req.body.email)
    const { email } = req.body
    User.findOne({ email: email }, (err, user) => {
        if (user) {
          userdata=user;
            console.log(userdata);
//              providing link to mail which will be containt only 10 min
//             const token = jwt.sign(email,signature,{expiresIn:"10m"});
            const token = jwt.sign(email,signature);
            const link =`http://localhost:5000/Reset/viewnewpasspage/${token}`
            const rt = sendmail(email,link);
            res.send("sucess");
        }
        else {
            res.send({ message: "Not Registered User" })
        }
    })
})   


// we can rev request on link which is send via enmail
route.get("/viewnewpasspage/:token",(req,resp)=>{
    const token = req.params;
    console.log(token);
    try {
        const data = jwt.verify(token.token,signature);
        console.log(data);
        resp.render('index',{email:data});
    } catch (error) {
       resp.send(error); 
    
    }
})


//   Changepass




//Update  
route.post('/resetpassword', (req, res) => {
    const {email,password}=req.body;
    User.updateOne({ email: email }, { $set: { password: password } }, { new: true }).then(() => res.redirect( 301,"http://localhost:3000/login")).catch(err =>  res.send(err));

})



export default (route)







