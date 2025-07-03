// Imports required modules for file system, input handling, paths, and styling
import fs from "fs/promises";
import readline from "readline-sync";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import loadRiddleDatabase from "./read.js"

// Set up the path to the riddle database file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, "../riddelsDB/db.txt");


/**
 * Prompt user until a non-empty string is entered.
 * @param {string} query - The message shown to the user.
 * @returns {string} - The user's input.
 */
function getInputFromUser(query) {
  let data
  do {
    data = readline.question(query);
    if (!data) { console.log(chalk.red("Error receiving data, please enter again.")) }
  }
  while (!data)
  return data;
}

/**
 * Prompt user for a valid difficulty level (easy, medium, hard).
 * @returns {string} - The selected difficulty level.
 */
function getLevel() {
  let difficulty;
  do {
    difficulty = readline.question("What is the difficulty level?: (hard or easy or medium)");
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
  const newObj = {}
  newObj.id = riddles.length + 1;
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
async function saveRiddlesToDB(riddles) {
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
export default async function createMenager() {
  try {
    const riddles = await loadRiddleDatabase();
    const newObj = createRiddle(riddles);
    riddles.push(newObj);
    await saveRiddlesToDB(riddles);
  }
  catch (err) {
    console.log(chalk.red("Error: " + err.message));
  }

}
