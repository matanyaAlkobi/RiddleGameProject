import loadDataFromDatabase from "../DAL/CurdRiddels/readFromDB.js"
import { createMenager } from "../service/service.createRiddle.js"
import { UpdateDB } from "../service/service.updateRiddle.js"
import { deleteByIdSerch } from "../service/service.deleteRiddle.js"

import path from "path";
import { fileURLToPath } from "url";
// Set up the path to the riddle database file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbRiddlePath = path.resolve(__dirname, "../DAL/DB/riddelsDB.txt");

export async function getAllRiddels(req, res) {
    const riddles = await loadDataFromDatabase(dbRiddlePath);

    res.json(riddles)
}

export async function handleCreateRiddle(req, res) {
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

}


export async function handleUpdateRiddle(req, res) {
    const idToUpdate = parseInt(req.params.id);

    try {
        await UpdateDB(idToUpdate, req.body, dbRiddlePath);
        res.status(200).json({ message: "Riddle updated successfully" });
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
}


export async function handleDeleteRiddle(req, res) {
    const idToDelete = parseInt(req.params.id);
    try {
        await deleteByIdSerch(idToDelete, dbRiddlePath);
        res.status(200).json({ message: "riddle  deleted successfully" })
    }
    catch (err) {
        res.status(err.status || 500).json({ error: err.message })
    }
}