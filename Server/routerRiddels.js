import express from "express";
import { getAllRiddels,
     handleCreateRiddle,
      handleUpdateRiddle,
       handleDeleteRiddle }
        from "./controller/riddels.controller.js";


const router = express.Router();
export default router;

/**
 * @route GET /
 * @desc Get all riddles
 * @access Public
 */
router.get('/', getAllRiddels)

/**
 * @route POST /create
 * @desc Create a new riddle
 * @access Public
 */
router.post('/create', handleCreateRiddle)

/**
 * @route PUT /:id
 * @desc Update a riddle by ID
 * @access Public
 */
router.put('/:id', handleUpdateRiddle);

/**
 * @route DELETE /:id
 * @desc Delete a riddle by ID
 * @access Public
 */
router.delete('/:id', handleDeleteRiddle)




