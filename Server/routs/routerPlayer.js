import express from "express";
import { getAllPlayers, handleCreatePlayer } from "../controller/player.controller.js";


const router = express.Router()

router.get("/",getAllPlayers)

/**
 * @route POST /create
 * @desc Create a new riddle
 * @access Publicn
 */
router.post('/create', handleCreatePlayer)






export default router;