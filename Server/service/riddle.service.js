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

/**
 * Updates an existing object in the database by ID.
 * Only keys present in the existing object will be updated.
 *
 * @param {number|string} id - ID of the object to update
 * @param {Object} newData - Object containing the updated fields and values
 * @param {string} dbPath - Path to the database file
 * @throws Will throw an error if no object with the given ID is found
 * @returns {Promise<void>}
 */
export async function UpdateDB(id, newData, dbPath) {
    try {
        let updatedChecker = false;
        const idToUpdate = Number(id);
        const dataFromDB = await loadDataFromDatabase(dbPath);
        for (let i = 0; i < dataFromDB.length; i++) {

            if (dataFromDB[i].id === idToUpdate) {
                updatedChecker = true;
                for (const key in newData) {
                    if (key in dataFromDB[i]) {
                        dataFromDB[i][key] = newData[key];
                    }
                }
                break;
            }
        }
        if (!updatedChecker) {
            const err = new Error("There is no object with such an id.");
            err.status = 404;
            throw err;
        }
        await writeToFile(dataFromDB, dbPath)
        console.log("The object was successfully updated.")
    }
    catch (err) {
        console.error("Error updating the object", err.message)
        throw err;
    }
}


