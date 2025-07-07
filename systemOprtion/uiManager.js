import readline from "readline-sync";
import chalk from "chalk";

export function printWelcome() {
    console.log("Welcome to our game!");
}

/**
 * Prompt user until a non-empty string is entered.
 * @param {string} query - The message shown to the user.
 * @returns {string} - The user's input.
 */
export function getInputFromUser(query) {
  let data
  do {
    data = readline.question(query);
    if (!data) { console.log(chalk.red("Error receiving data, please enter again.")) }
  }
  while (!data)
  return data;
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
