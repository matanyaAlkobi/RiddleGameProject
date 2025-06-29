import  { rid1, rid2,rid3,Player, Riddle } from "../Modules/allModules.js";
import chalk from "chalk";
import readline from "readline-sync";

function run(){
    console.log("Welcome to our game");
    const playerName = readline.question("What is your name? ")
    const  player1 = new  Player(playerName)
    createARiddle(rid1, player1);
    createARiddle(rid2, player1);
    createARiddle(rid3, player1);
    player1.showStatus();
}


function createARiddle(rid,player){
    const r = new Riddle(rid.id, rid.name, rid.taskDescription, rid.correctAnswer);
    const start = Date.now();
    r.ask();
    const end = Date.now();
    player.recordTime(start,end);
}

run();


