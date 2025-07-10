import loadRiddleDatabase from "../DAL/CurdRiddels/read.js"
import { getInputFromUser, getDifficultyChoice } from "../../client/systemOpretion/uiManager.js"
import { writeRiddlesToFile } from "../DAL/CurdRiddels/saveToDB.js"


export async function riddleUpdate(id, newData) {
    try {
        let updatedChecker  = false;
        const idToUpdate = Number(id);
        const allRiddles = await loadRiddleDatabase();
        for (let i = 0; i < allRiddles.length; i++) {

            if (allRiddles[i].id === idToUpdate) {
                updatedChecker = true;
                for (const key in newData) {
                    if (key in allRiddles[i]) {
                        allRiddles[i][key] = newData[key];
                    }
                }
                break;
            }
        }
        if(!updatedChecker){
            const err =new Error("There is no riddle with such an id.");
            err.status = 404;
            throw err;
        }
        await writeRiddlesToFile(allRiddles)
        console.log("The riddle was successfully updated.")
    }
    catch (err) {
        console.error("Error updating the riddle", err.message)
        throw err;
    }
}

