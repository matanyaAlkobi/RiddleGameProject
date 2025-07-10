import express from "express";
import { getAllPlayers, } from "../controller/player.controller.js";


const router = express.Router()

router.get("/",getAllPlayers)







export default router;