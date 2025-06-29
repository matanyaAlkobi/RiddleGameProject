import  { allRiddles,Player, Riddle } from "../Modules/allModules.js";
import chalk, { foregroundColorNames } from "chalk";
import readline from "readline-sync";


function startGame(){
    console.log("Welcome to our game");
    const playerName = readline.question("What is your name? ")
    const  player = new  Player(playerName)
    const riddleInstances = allRiddles.map(riddle => createRiddleFromData(riddle));
    riddleInstances.forEach(riddle => {handleRiddleSession(riddle, player)});
    player.showStatus();
}


function createRiddleFromData(rid){
    return new Riddle(rid.id, rid.name, rid.taskDescription, rid.correctAnswer); 
}

function handleRiddleSession(riddle, player){
    const start = Date.now();
    riddle.ask();
    const end = Date.now();
    player.recordTime(start,end);    
}

startGame();


