import loadDataFromDatabase from "../DAL/CurdRiddels/readFromDB.js"
import { writeToFile } from "../DAL/CurdRiddels/saveToDB.js"


/**
 * Deletes a object from the database by a user-provided ID.
 * 1. Prompts user for the ID.
 * 2. Loads current object from the database.
 * 3. Removes the matching object if it exists.
 * 4. Saves the updated list back to the database.
 */
export async function deleteByIdSerch(idFromServer, dbPath) {
  try {
    const DBData = await loadDataFromDatabase(dbPath);
    const idToDelete = Number(idFromServer);
    if (isNaN(idToDelete)) {
      const err = new Error("Provided ID is not a valid number.");
      err.status = 400;
      throw err;
    }
    const updatedData = DBData.filter(riddel => { return riddel.id !== idToDelete });
    if (updatedData.length === DBData.length) {
      const err = new Error(`Object with ID ${idToDelete} was not found.`);
      err.status = 404;
      throw err;
    }
    writeToFile(updatedData, dbPath);
    console.log("The object was successfully deleted.")

  }
  catch (err) {
    console.error("Error deleting object:", err.message);
    throw err
  }
}




