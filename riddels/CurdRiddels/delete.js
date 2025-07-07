import loadRiddleDatabase from "./read.js"
import { getInputFromUser } from "../../systemOprtion/uiManager.js"
import {writeRiddlesToFile} from "./saveRiddlesToDB.js"


/**
 * Deletes a riddle from the database by a user-provided ID.
 * 1. Prompts user for the ID.
 * 2. Loads current riddles from the database.
 * 3. Removes the matching riddle if it exists.
 * 4. Saves the updated list back to the database.
 */
export async function deleteRiddleById(){
    try{
    const inputId = getInputFromUser("Enter the id of the riddle to delete: ");
    const allRiddles = await loadRiddleDatabase();
    const idToDelete = Number(inputId);
    const updatedRiddles = allRiddles.filter(riddel =>{ return riddel.id !== idToDelete});
    writeRiddlesToFile(updatedRiddles);
    }
    catch(err){
        console.error("Error deleting riddle:", err.message);
    }
}
await deleteRiddleById();