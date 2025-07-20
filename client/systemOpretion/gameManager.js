import {
  getInputFromUser,
  getDifficultyChoice,
  printWelcome,
  askForId,
} from "./uiManager.js";
import { createRiddleFromData, handleRiddleSession } from "./riddleService.js";
import { Riddle, Player } from "../Models/index.js";
import { viewRiddlesHandler } from "./riddleController.js";

/**
 * Starts the riddle game.
 * - Greets the player.
 * - Prompts for the player's name.
 * - Runs through all riddles one by one.
 * - Displays the total and average time at the end.
 */
export async function startGame() {
  printWelcome();
  const playerName = getInputFromUser("What is your name? ");
  //   const playerID = askForId();
  const result = await checkIfPlayerExists(playerName);
  let player;

  if (result.exists) {
    player = new Player(result.player.name, result.player.answeredRiddles);
  } else {
    player = new Player(playerName, []);
  }
  const allRiddles = await viewRiddlesHandler();
  const levelchoise = getDifficultyChoice();
  const selectedRiddles = allRiddles.filter(
    (riddle) => riddle.difficulty === levelchoise
  );
  const unansweredRiddles = selectedRiddles.filter(
    (riddle) => !player.answeredRiddles.includes(riddle._id)
  );

  const riddleInstances = unansweredRiddles.map((riddle) =>
    createRiddleFromData(riddle)
  );
  riddleInstances.forEach((riddle) => {
    handleRiddleSession(riddle, player);
  });
  const gameTime = player.showStatus();

  if (!result.exists) {
    console.log("unansweredRiddles:", unansweredRiddles);

    console.log("selectedRiddles:", selectedRiddles);
    await createPlayerHandler({
      name: playerName,
      bestTime: gameTime.avg,
      answeredRiddles: JSON.stringify(unansweredRiddles.map((r) => r._id)),
    });
  } else {
  }
}

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

export async function updatePlayerHandler() {
  const inputId = askForId();
  const newUpdateriddle = {
    name: "new",
    bestTime: 1,
    answeredRiddles: ["r1", "r2"],
  };
  try {
    const updatedResponse = await fetch(
      `http://localhost:4545/player/${inputId}`,
      {
        method: "PUT",
        body: JSON.stringify(newUpdateriddle),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());
    console.log(updatedResponse);
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
