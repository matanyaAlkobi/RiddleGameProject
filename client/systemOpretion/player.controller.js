export async function viewAllPlayersHandler() {
  const allPlayers = await fetch("http://localhost:4545/player").then((data) =>
    data.json()
  );
  console.log(JSON.stringify(allPlayers));
}

/**
 * Sends a POST request to create a new riddle using user input.
 */
export async function createPlayerHandler(newObj) {
  console.log(`sending... ${JSON.stringify(newObj)}`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const createResponse = await fetch("http://localhost:4545/player/create", {
    method: "POST",
    body: JSON.stringify(newObj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!createResponse.ok) {
    const text = await createResponse.text();
    console.error("Server error or invalid response:", text);
    return;
  }
  const data = await createResponse.json();
  console.log(data.player);
  return data;
}

export async function updatePlayerHandler(name, newData) {
  try {
    const updatedResponse = await fetch(
      `http://localhost:4545/player/${name}`,
      {
        method: "PUT",
        body: JSON.stringify(newData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!updatedResponse.ok) {
      const errorText = await updatedResponse.text();
      throw new Error(
        `Server responded with error: ${response.status} - ${errorText}`
      );
    }

    const newResponse = await updatedResponse.json();
    console.log("Player updated:", newResponse);
  } catch (err) {
    console.error("Failed to update player:", err.message);
  }
}

export async function checkIfPlayerExists(playerName) {
  try {
    const getPlayerResponse = await fetch(
      `http://localhost:4545/player/username/${playerName}`
    );
    if (getPlayerResponse.status === 404) {
      console.log("Player does not exist");
      return { exists: false };
    }
    if (!getPlayerResponse.ok) {
      throw new Error(`Server error: ${getPlayerResponse.status}`);
    }
    const data = await getPlayerResponse.json();
    console.log("Player exists:", data.player);
    return { exists: true, player: data.player };
  } catch (error) {
    console.error("Error fetching player:", error.message);
    return { exists: false };
  }
}
