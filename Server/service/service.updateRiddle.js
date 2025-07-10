import loadDataFromDatabase from "../DAL/CurdRiddels/readFromDB.js"
import { writeToFile } from "../DAL/CurdRiddels/saveToDB.js"


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

