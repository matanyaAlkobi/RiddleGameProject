import { getInputFromUser, getDifficultyChoice, printWelcome } from "./uiManager.js";
import {createRiddleFromData, handleRiddleSession} from "./riddleService.js"
import  { allRiddles,Player, Riddle } from "../Modules/allModules.js";

/**
 * Starts the riddle game.
 * - Greets the player.
 * - Prompts for the player's name.
 * - Runs through all riddles one by one.
 * - Displays the total and average time at the end.
 */
export function startGame(){
    printWelcome();
    const playerName = getInputFromUser();
    const  player = new  Player(playerName);
    const levelchoise =  getDifficultyChoice();
    const selectedRiddles =  allRiddles.filter(riddle =>  riddle.difficulty === levelchoise);
    const riddleInstances = selectedRiddles.map(riddle => createRiddleFromData(riddle));
    riddleInstances.forEach(riddle => {handleRiddleSession(riddle, player)});
    player.showStatus();
}


