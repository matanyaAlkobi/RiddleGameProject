import chalk from "chalk";
import { showMenu, getInputFromUser, getDifficultyChoice } from "./uiManager.js";

export async function choiceHandler() {
    let choice;
    do {
        choice = showMenu()
        switch (choice) {

            case "1":
                console.log("You chose to play riddles.");
                break;

            case "2":
                console.log("You chose to create a riddle.");
                const newObj = createRiddle();
                const response = await fetch("http://localhost:4545/riddels/create", {
                    method: "POST",
                    body: JSON.stringify(newObj),
                    headers: {
                        "Content-Type": "application/json"
                    }

                }).then(data => data.json())
                console.log(response)
                break;

            case "3":
                console.log("You chose to view all riddles.");
                const allRiddels = await fetch("http://localhost:4545/riddels")
                    .then(data => data.json())
                console.log(allRiddels)
                break;

            case "4":
                console.log("You chose to update a riddle.");
                break;

            case "5":
                console.log("You chose to delete a riddle.");
                break;

            case "6":
                console.log("Goodbye!");
                rl.close();
                return;
            default:
                console.log("Invalid choice. Please enter a number between 1 and 6.");
        }
    }
    while (choice !== 6);
}
await choiceHandler()

/**
 * Gather riddle data from user input.
 * @param {Array} riddles - Array of all riddle objects
 * @returns {Object} - New riddle object.
 */
function createRiddle() {
    const newObj = {}
    newObj.name = getInputFromUser("Enter riddle name: ");
    newObj.taskDescription = getInputFromUser("enter description: ");
    newObj.correctAnswer = getInputFromUser("Enter a correct answer: ");
    newObj.difficulty = getDifficultyChoice();
    return newObj;
}

function askForRiddleIdToDelete() {
    let inputId;
    do {
        inputId = getInputFromUser("Enter the id of the riddle to delete: ").trim();

        if (!inputId) {
            console.log(chalk.red("You must enter a valid ID."));
        }
    } while (!inputId);

    return inputId;
}

