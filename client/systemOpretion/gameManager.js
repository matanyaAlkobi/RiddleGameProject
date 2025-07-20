
import { getInputFromUser, getDifficultyChoice, printWelcome, askForId} from "./uiManager.js";
import { createRiddleFromData, handleRiddleSession } from "./riddleService.js"
import { Riddle, Player } from "../Models/index.js";

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
    const playerID = askForId();
    await  viewAllPlayersHandler();
    const player = new Player(playerName);
    const levelchoise = getDifficultyChoice();
    const selectedRiddles = allRiddles.filter(riddle => riddle.difficulty === levelchoise);

    const riddleInstances = selectedRiddles.map(riddle => createRiddleFromData(riddle));
    riddleInstances.forEach(riddle => { handleRiddleSession(riddle, player) });
    player.showStatus();
}

export async function viewAllPlayersHandler() {
    const allPlayers = await fetch("http://localhost:4545/player")
        .then(data => data.json())
    console.log(JSON.stringify(allPlayers));
}

/**
 * Sends a POST request to create a new riddle using user input.
 */
export async function createPlayerHandler() {
    const newObj = {
        name: "matan",
        bestTime: 5,
    }

    const createResponse = await fetch("http://localhost:4545/player/create", {
        method: "POST",
        body: JSON.stringify(newObj),
        headers: {
            "Content-Type": "application/json"
        }

    })
    if (!createResponse.ok) {
        const text = await createResponse.text();
        console.error("Server error or invalid response:", text);
        return;
    }
    const data = await createResponse.json();
    console.log(data.player)
    return  data;

}

export async function updatePlayerHandler() {
    const inputId = askForId();
    const newUpdateriddle = {
    "name": "new",
    "bestTime": 1,
    "answeredRiddles":["r1","r2"]
    
  }
    try {
        const updatedResponse = await fetch(`http://localhost:4545/player/${inputId}`, {
            method: "PUT",
            body: JSON.stringify(newUpdateriddle),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
        console.log(updatedResponse)
    }
    catch (err) {
        console.error("Failed to update player:", err.message);
    }
}

await viewAllPlayersHandler();