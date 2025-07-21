import {
  getInputFromUser,
  getDifficultyChoice,
  printWelcome,
  askForId,
} from "./uiManager.js";
import { createRiddleFromData, handleRiddleSession } from "./riddleService.js";
import { Riddle, Player } from "../Models/index.js";
import { viewRiddlesHandler } from "./riddleController.js";
import {checkIfPlayerExists, createPlayerHandler, updatePlayerHandler} from './player.controller.js'
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
    await updatePlayerHandler(playerName, {
      answeredRiddles: unansweredRiddles.map((r) => r._id),
      bestTime: gameTime.avg,
    });
  }
}

