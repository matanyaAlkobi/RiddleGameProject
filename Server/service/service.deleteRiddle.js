import loadRiddleDatabase from "../DAL/CurdRiddels/read.js"
import { writeRiddlesToFile } from "../DAL/CurdRiddels/saveRiddlesToDB.js"


/**
 * Deletes a riddle from the database by a user-provided ID.
 * 1. Prompts user for the ID.
 * 2. Loads current riddles from the database.
 * 3. Removes the matching riddle if it exists.
 * 4. Saves the updated list back to the database.
 */
export async function deleteRiddleById(idFromServer) {
  try {
    const allRiddles = await loadRiddleDatabase();
    const idToDelete = Number(idFromServer);
    if (isNaN(idToDelete)) {
      const err = new Error("Provided ID is not a valid number.");
      err.status = 400;
      throw err;
    }
    const updatedRiddles = allRiddles.filter(riddel => { return riddel.id !== idToDelete });
    if (updatedRiddles.length === allRiddles.length) {
      const err = new Error(`Riddle with ID ${idToDelete} was not found.`);
      err.status = 404;
      throw err;
    }
    writeRiddlesToFile(updatedRiddles);
    console.log("The riddle was successfully deleted.")

  }
  catch (err) {
    console.error("Error deleting riddle:", err.message);
    throw err
  }
}




