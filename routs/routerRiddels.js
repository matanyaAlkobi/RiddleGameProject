import express from "express";
import {
  getAllRiddels,
  handleCreateRiddle,
  handleUpdateRiddle,
  deleteRiddleHandler,
} from "../controller/riddels.controller.js";
import { authenticateUser } from "../auth/auth.js";

const router = express.Router();

/**
 * @route GET /
 * @desc Get all riddles
 * @access Public
 */
router.get("/",authenticateUser, getAllRiddels);

/**
 * @route POST /create
 * @desc Create a new riddle
 * @access Public
 */
router.post("/create", handleCreateRiddle);

/**
 * @route PUT /:id
 * @desc Update a riddle by ID
 * @access Public
 */
router.put("/:id", handleUpdateRiddle);

/**
 * @route DELETE /:id
 * @desc Delete a riddle by ID
 * @access Public
 */
router.delete("/:id", deleteRiddleHandler);

export default router;
