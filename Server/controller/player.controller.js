import loadDataFromDatabase from "../DAL/CurdRiddels/readFromDB.js"
import { createPlayerMenager ,  updatePlayerDB} from "../service/player.service.js"


import path from "path";
import { fileURLToPath } from "url";
// Set up the path to the riddle database file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPlayerPath = path.resolve(__dirname, "../DAL/DB/playersDB.txt");

/**
 * Retrieve all riddles from the database.
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
export async function getAllPlayers(req, res) {
    const riddles = await loadDataFromDatabase(dbPlayerPath);

    res.json(riddles)
}


export async function handleCreatePlayer(req, res) {
    try {
        const { name, bestTime, id } = req.body;
        if (
            typeof name !== "string" || name.trim() === "" ||
            typeof bestTime !== "number"
                ) {
            return res.status(400).json({ error: "Invalid player data" });
        }
        const player = await createPlayerMenager(req.body, dbPlayerPath);
        return res.json(player);
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}


export async function handleUpdatePlayer(req, res) {
    const idToUpdate = parseInt(req.params.id);
    try {
        await updatePlayerDB(idToUpdate, req.body, dbPlayerPath);
        res.status(200).json({ message: "Player updated successfully" });
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
}
