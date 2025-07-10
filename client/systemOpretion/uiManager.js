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


/**
 * Displays the main menu and prompts the user to choose an option.
 * @returns {string} User's menu choice between "1" and "6".
 */
export function showMenu() {
  let choice;
  do {
    if (!["1", "2", "3", "4", "5", "6"].includes(choice) && choice !== undefined) {
      console.log(chalk.red("Invalid choice. Please select a number between 1 and 6.\n"))
    }
    console.log(chalk.blue(`
=== Riddle Game Menu ===
    1. Play Riddles
    2. Create a Riddle
    3. View All Riddles
    4. Update a Riddle
    5. Delete a Riddle
    6. Exit
  `));


    choice = readline.question("Choose an option (1-6): ")
  }
  while (!["1", "2", "3", "4", "5", "6"].includes(choice))
  return choice;

}


/**
 * Gather riddle data from user input.
 * @param {Array} riddles - Array of all riddle objects
 * @returns {Object} - New riddle object.
 */
export function createRiddle() {
    const newObj = {}
    newObj.name = getInputFromUser("Enter riddle name: ");
    newObj.taskDescription = getInputFromUser("enter description: ");
    newObj.correctAnswer = getInputFromUser("Enter a correct answer: ");
    newObj.difficulty = getDifficultyChoice();
    return newObj;
}

/**
 * Prompts the user to enter a valid numeric riddle ID.
 * @returns {number} The validated numeric ID.
 */
export function askForRiddleId() {
    {
        let inputId;
        let num = 1;
        do {
            inputId = getInputFromUser("Enter a id: ").trim();
            num = Number(inputId)
            if (!inputId) {
                console.log(chalk.red("You must enter a valid ID."));
                continue;
            }

            if (isNaN(num)) { console.log(chalk.red("You must enter a numeric ID.")); }

        }
        while (isNaN(num))
        console.log(chalk.green("Valid number entered:"));
        return num;
    }
}




