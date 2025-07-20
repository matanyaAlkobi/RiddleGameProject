import chalk from "chalk";
import { showMenu, getInputFromUser } from "./uiManager.js";
import {createRiddleHandler,viewRiddlesHandler, updateRiddleHandler,deleteRiddleHandler} from "./riddleController.js";
import  {startGame}  from './gameManager.js'

/**
 * Handles the main menu choice flow.
 * Loops until user selects exit (option 6).
 * Calls respective handlers based on user choice.
 *
 * @returns {Promise<void>}
 */
export async function choiceHandler() {
    let choice;
    do {
        choice = showMenu()
        switch (choice) {

            case "1":
                console.log("You chose to play riddles.");
                await startGame()
                break;

            case "2":
                console.log("You chose to create a riddle.");
                    await createRiddleHandler();
                break;

            case "3":
                console.log("You chose to view all riddles.");
                console.log(await viewRiddlesHandler());
                break;

            case "4":
                console.log("You chose to update a riddle.");
                await updateRiddleHandler();
                
                break;

            case "5":
                console.log("You chose to delete a riddle.");
                await deleteRiddleHandler();
                break;

            case "6":
                console.log("Goodbye!");
                
                return;
            default:
                console.log("Invalid choice. Please enter a number between 1 and 6.");
        }
    }
    while (choice !== 6);
}
await choiceHandler()







