import loadDataFromDatabase from "../DAL/CurdRiddels/readFromDB.js"
import { createMenager, UpdateDB, deleteByIdSerch } from "../service/riddle.service.js"


import path from "path";
import { fileURLToPath } from "url";
// Set up the path to the riddle database file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbRiddlePath = path.resolve(__dirname, "../DAL/DB/playersDB.txt");

/**
 * Retrieve all riddles from the database.
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
export async function getAllPlayers(req, res) {
    const riddles = await loadDataFromDatabase(dbRiddlePath);

    res.json(riddles)
}