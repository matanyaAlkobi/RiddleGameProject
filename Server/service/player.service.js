import loadDataFromDatabase from "../DAL/CurdRiddels/readFromDB.js";
import { writeToFile } from "../DAL/CurdRiddels/saveToDB.js";
``;
import { supabase } from "../lib/supabase.js";
export async function createPlayerMenager(playerData) {
  try {
    const { data: existingPlayers, error: selectError } = await supabase
      .from("players")
      .select("*")
      .eq("name", playerData.name.toLowerCase());

    if (selectError) throw selectError;
    if (existingPlayers.length > 0) {
      return { status: "exists", player: existingPlayers[0] };
    }

    const { data: newPlayer, error: insertError } = await supabase
      .from("players")
      .insert([
        {
          name: playerData.name.toLowerCase(),
          bestTime: playerData.bestTime,
          answeredRiddles: playerData.answeredRiddles,
        },
      ])
      .select()
      .maybeSingle();
    if (insertError) throw insertError;

    return { status: "created", player: newPlayer };
  } catch (err) {
    console.error("Supabase error:", err.message);
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
    const updatedPlayers = updatePlayerData(dataFromDB, idToUpdate, newData);
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
