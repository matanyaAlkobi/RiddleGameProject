import loadRiddleDatabase from "../DAL/CurdRiddels/read.js"
import { getInputFromUser, getDifficultyChoice } from "../../client/system Opretion/uiManager.js"
import { writeRiddlesToFile } from "../DAL/CurdRiddels/saveRiddlesToDB.js"


async function riddleUpdate(id, newData) {
    try {
        const idToUpdate = Number(id);
        const allRiddles = await loadRiddleDatabase();
        for (let i = 0; i < allRiddles.length; i++) {
            if (allRiddles[i].id === idToUpdate) {
                for (const key in newData) {
                    if (key in allRiddles[i]) {
                        allRiddles[i][key] = newData[key];
                    }
                }
                break;
            }
        }
        await writeRiddlesToFile(allRiddles)
        console.log("The riddle was successfully updated.")
    }
    catch (err) {
        console.error("Error updating the riddle", err.message)
    }
}

