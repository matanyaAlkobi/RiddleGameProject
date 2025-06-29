import  { allRiddles,Player, Riddle } from "../Modules/allModules.js";
import chalk, { foregroundColorNames } from "chalk";
import readline from "readline-sync";

/**
 * Starts the riddle game.
 * - Greets the player.
 * - Prompts for the player's name.
 * - Runs through all riddles one by one.
 * - Displays the total and average time at the end.
 */
function startGame(){
    console.log("Welcome to our game");
    const playerName = readline.question("What is your name? ")
    const  player = new  Player(playerName)
    const riddleInstances = allRiddles.map(riddle => createRiddleFromData(riddle));
    riddleInstances.forEach(riddle => {handleRiddleSession(riddle, player)});
    player.showStatus();
}

/**
 * Converts plain riddle data into a Riddle instance.
 * @param {Object} rid - Riddle data object.
 * @returns {Riddle} A Riddle instance.
 */
function createRiddleFromData(rid){
    return new Riddle(rid.id, rid.name, rid.taskDescription, rid.correctAnswer); 
}

/**
 * Handles a single riddle session:
 * - Records start time
 * - Asks the riddle
 * - Records end time and updates player's time log
 * @param {Riddle} riddle - The riddle to present.
 * @param {Player} player - The player answering.
 */
function handleRiddleSession(riddle, player){
    const start = Date.now();
    riddle.ask();
    const end = Date.now();
    player.recordTime(start,end);    
}

startGame();


