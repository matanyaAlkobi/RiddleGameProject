import loadDataFromDatabase  from "../DAL/CurdRiddels/readFromDB.js"
import {writeToFile} from "../DAL/CurdRiddels/saveToDB.js"

export async function createPlayerMenager(playerData, dbPath) {
    try {
        const DBData = await loadDataFromDatabase(dbPath);

        const existingPlayer = findExistingPlayer(playerData, DBData)
        if(existingPlayer){
            return { status: "exists", player: existingPlayer};
        }
        const maxID = DBData.length > 0 ? Math.max(...DBData.map(r => r.id)) : 0;
        playerData.id = maxID + 1
        DBData.push(playerData);
        await writeToFile(DBData, dbPath);
        return { status: "created", playerData };
    }
    catch (err) {
        console.error("Error: " + err.message);
        throw err;
    }
}


function findExistingPlayer(playerToCheck, playersList) {
    return playersList.find(player => player.name === playerToCheck.name);
}
