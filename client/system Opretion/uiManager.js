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


/**
 * Prompt user for a valid difficulty level (easy, medium, hard).
 * @returns {string} - The selected difficulty level.
 */
export function getDifficultyChoice() {
  let difficulty;

  do {
    difficulty = readline.question("What is the difficulty level?: (hard or easy or medium)");
    if (!["hard", "easy", "medium"].includes(difficulty.toLowerCase())) {
      console.log(chalk.red("Error reading the level, please enter a level that matches the options given."))
    }
  }
  while (!["hard", "easy", "medium"].includes(difficulty.toLowerCase()))
  return difficulty.toLowerCase();
}

