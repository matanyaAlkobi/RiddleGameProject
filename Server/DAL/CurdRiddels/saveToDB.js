import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import chalk from "chalk";


// Set up the path to the riddle database file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, "../DB/riddelsDB.txt");


/**
 * Save riddles array to the database file.
 * @param {Array} riddles - Array of all riddle objects to be saved.
 * @returns {Promise<void>}
 */
export async function writeRiddlesToFile(riddles) {
  try {
    await fs.writeFile(dbPath, JSON.stringify(riddles, null, 2));
    console.log(chalk.green("The new puzzle has been successfully entered into the database."))
  }
  catch (err) {
    throw new Error("Failed to write to DB: " + err.message);
  }

}