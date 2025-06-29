import { Riddle } from "../Modules/allModules.js";

/**
 * Converts plain riddle data into a Riddle instance.
 * @param {Object} rid - Riddle data object.
 * @returns {Riddle} A Riddle instance.
 */
export function createRiddleFromData(rid){
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
export function handleRiddleSession(riddle, player){
    const start = Date.now();
    riddle.ask();
    const end = Date.now();
    player.recordTime(start,end);    
}
