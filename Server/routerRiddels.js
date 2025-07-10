import express from "express"
import loadDataFromDatabase from "./DAL/CurdRiddels/readFromDB.js"
import { createMenager } from "./service/service.createRiddle.js"
import { UpdateDB } from "./service/service.updateRiddle.js"
import { deleteByIdSerch } from "./service/service.deleteRiddle.js"
import path from "path";
import { fileURLToPath } from "url";
// Set up the path to the riddle database file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbRiddlePath = path.resolve(__dirname, "./DAL/DB/riddelsDB.txt");


const router = express.Router();
export default router;


router.get('/', async (req, res) => {
    const riddles = await loadDataFromDatabase(dbRiddlePath);

    res.json(riddles)
})

router.post('/create', async (req, res) => {
    const { id, name, taskDescription, correctAnswer, difficulty } = req.body;

    if (
        typeof name !== "string" || name.trim() === "" ||
        typeof taskDescription !== "string" || taskDescription.trim() === "" ||
        typeof correctAnswer !== "string" || correctAnswer.trim() === "" ||
        !["easy", "medium", "hard"].includes(difficulty)
    ) {
        return res.status(400).json({ error: "Invalid riddle data" });
    }
    await createMenager(req.body, dbRiddlePath);
    res.status(201).json({ message: "Riddle saved successfully!", riddle: req.body });

})



/**
 * @route PUT /riddels/update/:id
 * @description Update a riddle by its ID
 * @param {string} id - ID of the riddle to update (from URL)
 * @body { name, taskDescription, correctAnswer, difficulty }
 * @returns {object} Success or error message
 */
router.put('/:id', async (req, res) => {
    const idToUpdate = parseInt(req.params.id);

    try {
        await UpdateDB(idToUpdate, req.body, dbRiddlePath);
        res.status(200).json({ message: "Riddle updated successfully" });
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const idToDelete = parseInt(req.params.id);
    try {
        await deleteByIdSerch(idToDelete, dbRiddlePath);
        res.status(200).json({ message: "riddle  deleted successfully" })
    }
    catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
})




