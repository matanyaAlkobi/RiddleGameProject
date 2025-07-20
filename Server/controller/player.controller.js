import loadDataFromDatabase from "../DAL/CurdRiddels/readFromDB.js";
import {
  createPlayerMenager,
  updatePlayerDB,
} from "../service/player.service.js";
import { supabase } from "../lib/supabase.js";

import path from "path";
import { fileURLToPath } from "url";
// Set up the path to the riddle database file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPlayerPath = path.resolve(__dirname, "../DAL/DB/playersDB.txt");

export async function getAllPlayers(req, res) {
  try {
    const { data, error } = await supabase.from("players").select("*");

    if (error) {
      throw new Error(`Error connecting to database: ${error.message}`);
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("Database fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch players" });
  }
}

export async function handleCreatePlayer(req, res) {
  try {
        console.log("Received request to create player:", req.body);  

    let { name, bestTime, answeredRiddles} = req.body;
    bestTime = Number(bestTime)
    if (
      typeof name !== "string" ||
      name.trim() === "" ||
      typeof bestTime !== "number"||
      isNaN(bestTime)
    ) {
      return res.status(400).json({ error: "Invalid player data" });
    }
    const player = await createPlayerMenager({ name, bestTime, answeredRiddles});
    return res.status(200).json(player);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function handleUpdatePlayer(req, res) {
  const idToUpdate = parseInt(req.params.id);
  try {
    await updatePlayerDB(idToUpdate, req.body, dbPlayerPath);
    res.status(200).json({ message: "Player updated successfully" });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
}

export async function getPlayerByUsername(req, res) {
  const playerName = req.params.username;
  try {
    const { data, error } = await supabase
      .from("players")
      .select()
      .eq("name", playerName)
      .maybeSingle();

    if (error) {
      console.error("Error fetching player:", error.message);
      return res.status(500).json({ error: "Database error" });
    }
    if (!data) {
      return res.status(404).json({ error: "Player not found" });
    }
    return res.status(200).json({ player: data });
  } catch (err) {
    console.error("Unexpected error:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}
