import fs from "fs/promises";
import chalk from "chalk";





/**
 * Save riddles array to the database file.
 * @param {Array} riddles - Array of all riddle objects to be saved.
 * @returns {Promise<void>}
 */
export async function writeToFile(dataArray,dbPath) {
  try {
    await fs.writeFile(dbPath, JSON.stringify(dataArray, null, 2));
    console.log(chalk.green("The new data has been successfully entered into the database."))
  }
  catch (err) {
    console.error("Failed to write to DB: " + err.message);
    throw err;
  }

}