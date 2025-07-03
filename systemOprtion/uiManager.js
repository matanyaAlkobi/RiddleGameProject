import readline from "readline-sync";
import chalk from "chalk";

export function printWelcome() {
    console.log("Welcome to our game!");
}

export function getPlayerName() {
    let name;
    do {
        name = readline.question("What is your name? ");
        if (!name) { console.log(chalk.red("Error entering name: please enter again")) };
    }
    while (!name)
    return name;
}

export function getDifficultyChoice() {
    let choice;
    do {
        choice = readline.question("choose difficulty easy or medium or hard: ");
        if ((choice != "easy") && (choice != "medium") && (choice != "hard")) {
            console.log(chalk.red("Invalid choice. Please enter easy, medium, or hard."))
        }
    }
    while ((choice != "easy") && (choice != "medium") && (choice != "hard"));
    return choice;
}
