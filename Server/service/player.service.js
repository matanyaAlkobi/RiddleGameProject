import loadDataFromDatabase from "../DAL/CurdRiddels/readFromDB.js";
import { writeToFile } from "../DAL/CurdRiddels/saveToDB.js";

export async function createPlayerMenager(playerData, dbPath) {
  try {
    const DBData = await loadDataFromDatabase(dbPath);

    const existingPlayer = findExistingPlayer(playerData, DBData);
    if (existingPlayer) {
      return { status: "exists", player: existingPlayer };
    }
    const maxID = DBData.length > 0 ? Math.max(...DBData.map((r) => r.id)) : 0;
    playerData.id = maxID + 1;
    DBData.push(playerData);
    await writeToFile(DBData, dbPath);
    return { status: "created", playerData };
  } catch (err) {
    console.error("Error: " + err.message);
    throw err;
  }
}

function findExistingPlayer(playerToCheck, playersList) {
  return playersList.find((player) => player.name === playerToCheck.name);
}

export async function updatePlayerDB(id, newData, dbPath) {
  try {
    const idToUpdate = Number(id);
    const dataFromDB = await loadDataFromDatabase(dbPath);
    const updatedPlayers  = updatePlayerData(dataFromDB,idToUpdate,newData)
    await writeToFile(updatedPlayers, dbPath);
    console.log("The object was successfully updated.");
  } catch (err) {
    console.error("Error updating the object", err.message);
    throw err;
  }
}


function updatePlayerData(players, id, newData) {
  const index = players.findIndex((player) => player.id === id);

  if (index === -1) {
    const err = new Error("There is no object with such an id.");
    err.status = 404;
    throw err;
  }

  players[index].answeredRiddles.push(...newData.answeredRiddles);

  if (players[index].bestTime > newData.bestTime) {
    players[index].bestTime = newData.bestTime;
  }

  return players;
}
