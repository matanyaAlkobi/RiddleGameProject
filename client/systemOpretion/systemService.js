import chalk from "chalk";
import { showMenu, getInputFromUser } from "./uiManager.js";
import {createRiddleHandler,viewRiddlesHandler, updateRiddleHandler,deleteRiddleHandler} from "./riddleController.js"


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
                    await createRiddleHandler();
                break;

            case "3":
                console.log("You chose to view all riddles.");
                await viewRiddlesHandler();
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







