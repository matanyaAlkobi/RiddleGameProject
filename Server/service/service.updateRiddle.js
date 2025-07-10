import loadDataFromDatabase from "../DAL/CurdRiddels/readFromDB.js"
import { writeToFile } from "../DAL/CurdRiddels/saveToDB.js"

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

