import express from  "express"
import loadRiddleDatabase from "./DAL/CurdRiddels/read.js"
import {createMenager} from "./service/service.createRiddle.js"

const router = express.Router();


export default  router;


router.get('/',async(req,res)=>{
        const riddles = await loadRiddleDatabase();

    res.json(riddles)
})

router.post('/create', async(req,res)=>{
    await createMenager(req.body);
    res.send("post")
})