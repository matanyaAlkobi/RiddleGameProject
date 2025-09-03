import express from "express";
import bcrypt from "bcrypt";
import "dotenv/config";
import  {supabase}  from "../lib/supabase.js";
import {handleUserRegistration} from '../DAL/users.DAL.js'

const router = express.Router();

router.post('/signup',async(req,res)=>{
    const {username,password}  =  req.body;
    const hashedPassword =  await bcrypt.hash(password,12)
    await handleUserRegistration({username,hashedPassword})
});

router.post('/login',(req,res)=>{
    try {
            const {username,password} = req.body  
            
    } catch (error) {
        
    }

})
export default router;