import { showMenu } from "./uiManager.js";

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