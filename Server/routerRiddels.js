import express from "express";
import { getAllRiddels, handleCreateRiddle, handleUpdateRiddle, handleDeleteRiddle } from "./controller/riddels.controller.js";


const router = express.Router();
export default router;


router.get('/', getAllRiddels)

router.post('/create', handleCreateRiddle)

router.put('/:id', handleUpdateRiddle);

router.delete('/:id', handleDeleteRiddle)




