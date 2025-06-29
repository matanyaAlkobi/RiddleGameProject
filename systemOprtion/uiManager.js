import readline from "readline-sync";
import chalk from "chalk";

export function printWelcome() {
    console.log("Welcome to our game!");
}

export function getPlayerName() {
    return readline.question("What is your name? ");
}

export function getDifficultyChoice(){
    let choice;
    do{
        choice = readline.question("choose difficulty easy or medium or hard: ");
            if((choice != "easy") && (choice != "medium") && (choice != "hard")){
                console.log(chalk.red("Invalid choice. Please enter easy, medium, or hard."))
            }
    }
    while((choice != "easy") && (choice != "medium") && (choice != "hard"));
    return choice;
}
