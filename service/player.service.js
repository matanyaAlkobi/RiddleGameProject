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

export async function updatePlayerDB(name, newData) {
  try {
    const { data, error } = await supabase
      .from("players")
      .update({ bestTime: newData.bestTime })
      .eq("name", name);
    if (error) {
      throw new Error("Error updating value:", error);
    }
    console.log("The object was successfully updated.");
  } catch (error) {
    console.error("Error updating the object", error.message);
    throw err;
  }
}


