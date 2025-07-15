import express from "express";
import { getAllPlayers, handleCreatePlayer,  handleUpdatePlayer} from "../controller/player.controller.js";


const router = express.Router()

router.get("/",getAllPlayers)

/**
 * @route POST /create
 * @desc Create a new riddle
 * @access Publicn
 */
router.post('/create', handleCreatePlayer)


/**
 * @route PUT /:id
 * @desc Update a player by ID
 * @access Public
 */
router.put('/:id', handleUpdatePlayer);






export default router;