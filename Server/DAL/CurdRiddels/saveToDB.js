import fs from "fs/promises";
import chalk from "chalk";






/**
 * Saves an array of riddles to the database file as JSON.
 *
 * @param {Array} dataArray - Array of riddle objects to save
 * @param {string} dbPath - Path to the database file
 * @returns {Promise<void>}
 * @throws Throws an error if writing to the file fails
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