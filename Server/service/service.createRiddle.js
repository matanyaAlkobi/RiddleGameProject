// Imports required modules for file system, input handling, paths, and styling
import loadRiddleDatabase from "../DAL/CurdRiddels/read.js"
import {writeRiddlesToFile} from "../DAL/CurdRiddels/saveToDB.js"





/**
 * Main function to manage the riddle creation process:
 * loads database, collects new riddle, saves it.
 * @returns {Promise<void>}
 */
export async function createMenager(newObj) {
  try {
    const riddles = await loadRiddleDatabase();
    const maxID = riddles.length > 0 ? Math.max(...riddles.map(r => r.id)) : 0;
    newObj.id = maxID + 1
    riddles.push(newObj);
    await writeRiddlesToFile(riddles);
  }
  catch (err) {
    console.error("Error: " + err.message);
  }

}

