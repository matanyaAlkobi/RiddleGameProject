// Imports required modules for file system, input handling, paths, and styling
import fs from "fs/promises";
import readline from "readline-sync";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import loadRiddleDatabase from "./read.js"
import { getInputFromUser } from "../../systemOprtion/uiManager.js"

// Set up the path to the riddle database file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, "../riddelsDB/db.txt");




/**
 * Prompt user for a valid difficulty level (easy, medium, hard).
 * @returns {string} - The selected difficulty level.
 */
function getLevel() {
  let difficulty;

  do {
    difficulty = readline.question("What is the difficulty level?: (hard or easy or medium)");
    if (!["hard", "easy", "medium"].includes(difficulty.toLowerCase())) {
      console.log(chalk.red("Error reading the level, please enter a level that matches the options given."))
    }
  }
  while (!["hard", "easy", "medium"].includes(difficulty.toLowerCase()))
  return difficulty.toLowerCase();
}


/**
 * Gather riddle data from user input.
 * @param {Array} riddles - Array of all riddle objects
 * @returns {Object} - New riddle object.
 */
function createRiddle(riddles) {
  const maxID = riddles.length > 0 ? Math.max(...riddles.map(r => r.id)) : 0;
  const newObj = {}
  newObj.id = maxID + 1
  newObj.name = getInputFromUser("Enter riddle name: ");
  newObj.taskDescription = getInputFromUser("enter description: ");
  newObj.correctAnswer = getInputFromUser("Enter a correct answer: ");
  newObj.difficulty = getLevel();
  return newObj;
}


/**
 * Save riddles array to the database file.
 * @param {Array} riddles - Array of all riddle objects to be saved.
 * @returns {Promise<void>}
 */
export async function saveRiddlesToDB(riddles) {
  try {
    await fs.writeFile(dbPath, JSON.stringify(riddles, null, 2));
    console.log(chalk.green("The new puzzle has been successfully entered into the database."))
  }
  catch (err) {
    throw new Error("Failed to write to DB: " + err.message);
  }

}


/**
 * Main function to manage the riddle creation process:
 * loads database, collects new riddle, saves it.
 * @returns {Promise<void>}
 */
export async function createMenager() {
  try {
    const riddles = await loadRiddleDatabase();
    const newObj = createRiddle(riddles);
    riddles.push(newObj);
    await saveRiddlesToDB(riddles);
  }
  catch (err) {
    throw new Error(chalk.red("Error: " + err.message));
  }

}
