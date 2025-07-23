import {
  loadDataFromDatabase,
  createRiddle,
  deleteRiddleById,
  updateRiddleByName,
} from "../DAL/riddelDAL.js";




/**
 * Retrieve all riddles from the database.
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
export async function getAllRiddels(req, res) {
  try {
    const riddles = await loadDataFromDatabase();
    res.json(riddles);
  } catch (err) {
    console.error("falid to read from db: ", err);
    throw err;
  }
}

/**
 * Validate and create a new riddle.
 * @param {import('express').Request} req - Express request object containing riddle data in body
 * @param {import('express').Response} res - Express response object
 */

export async function handleCreateRiddle(req, res) {
  const { name, taskDescription, correctAnswer, difficulty } = req.body;

  if (
    typeof name !== "string" ||
    name.trim() === "" ||
    typeof taskDescription !== "string" ||
    taskDescription.trim() === "" ||
    typeof correctAnswer !== "string" ||
    correctAnswer.trim() === "" ||
    !["easy", "medium", "hard"].includes(difficulty)
  ) {
    return res.status(400).json({ error: "Invalid riddle data" });
  }
  await createRiddle(req.body);
  res
    .status(201)
    .json({ message: "Riddle saved successfully!", riddle: req.body });
}

/**
 * Update an existing riddle by ID.
 * @param {import('express').Request} req - Express request object with params and body
 * @param {import('express').Response} res - Express response object
 */
export async function handleUpdateRiddle(req, res) {
  try {
    const CheckingIfItHasBeenUpdated = await updateRiddleByName(
      req.params.id,
      req.body
    );
    if (CheckingIfItHasBeenUpdated)
      res.status(200).json({ message: "Riddle updated successfully" });
    else
      res.status(200).json({ message: "No such riddle was found to update." });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
}

/**
 * Deletes a single riddle from the database using its ID.
 *
 * @function deleteRiddleHandler
 * @param {import('express').Request} req - Express request object, expects `id` param.
 * @param {import('express').Response} res - Express response object.
 * @returns {void} Sends a JSON response with success or error message.
 */
export async function deleteRiddleHandler(req, res) {
  try {
    const deletedRiddle = await deleteRiddleById(req.params.id);
    if (deletedRiddle)
      res.status(200).json({ message: "Riddle deleted successfully." });
    else res.status(200).json({ message: "No matching id found." });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
}
