import loadDataFromDatabase from "../DAL/CurdRiddels/readFromDB.js"
import { writeToFile } from "../DAL/CurdRiddels/saveToDB.js"



/**
 * Deletes an object by ID from the database.
 *
 * @param {number|string} idFromServer - ID of the object to delete (from request)
 * @param {string} dbPath - Path to the database file
 * @throws Will throw an error if ID is invalid or object not found
 * @returns {Promise<void>}
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




