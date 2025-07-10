// Imports required modules for file system, input handling, paths, and styling
import loadDataFromDatabase from "../DAL/CurdRiddels/readFromDB.js"
import { writeToFile } from "../DAL/CurdRiddels/saveToDB.js"





/**
 * Adds a new object to the database.
 * Loads current data, assigns a new unique ID, saves updated data.
 * 
 * @param {Object} newObj - The new riddle object to add
 * @param {string} dbPath - Path to the database file
 * @returns {Promise<void>}
 */
export async function createMenager(newObj, dbPath) {
  try {
    const DBData = await loadDataFromDatabase(dbPath);
    const maxID = DBData.length > 0 ? Math.max(...DBData.map(r => r.id)) : 0;
    newObj.id = maxID + 1
    DBData.push(newObj);
    await writeToFile(DBData, dbPath);
  }
  catch (err) {
    console.error("Error: " + err.message);
  }

}

