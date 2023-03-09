import { json, Router } from "express";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";



let userdata;
const route = Router();

//FindbyEmail
route.post("/custom", (req, res) => {
  console.log(req.body);
  const { email } = req.body;
  const { subject } =req.body;
  const { name } =req.body;
  const { desc } =req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      userdata = user;
      console.log(userdata);
      res.send("sucess");

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "rsmore2232@gmail.com",
          pass: "olmbarvdtvlioyci", // PERSON ID OF ME DONT USE IT
        },
      });

      let mailOptions = null;
      mailOptions = {
        from: "rsmore2232@gmail.com", // sender address
        to: email, // list of receivers
        subject:"This is response Generated for Customization" , // Subject line
        html:subject +desc, // plain text body
      };

      const result = {
        Status: "",
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          // console.log(result);
        } else {
          // console.log(info);
        }
        result[Status] = "sucess";
        return result;
      });
    } else {
      res.send({ message: "Not Registered User" });
    }
  });
});

export default (route)

