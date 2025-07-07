// Imports required modules for file system, input handling, paths, and styling
import readline from "readline-sync";
import chalk from "chalk";
import loadRiddleDatabase from "../DAL/CurdRiddels/read.js"
import { getInputFromUser, getDifficultyChoice} from "../../client/system Opretion/uiManager.js"
import {writeRiddlesToFile} from "../DAL/CurdRiddels/saveRiddlesToDB.js"


/**
 * Gather riddle data from user input.
 * @param {Array} riddles - Array of all riddle objects
 * @returns {Object} - New riddle object.
 */
function createRiddle(riddles) {
  const maxID = riddles.length > 0 ? Math.max(...riddles.map(r => r.id)) : 0;
  const newObj = {}
  newObj.id = maxID + 1
  newObj.name = getInputFromUser("Enter riddle name: ");
  newObj.taskDescription = getInputFromUser("enter description: ");
  newObj.correctAnswer = getInputFromUser("Enter a correct answer: ");
  newObj.difficulty = getDifficultyChoice();
  return newObj;
}


/**
 * Main function to manage the riddle creation process:
 * loads database, collects new riddle, saves it.
 * @returns {Promise<void>}
 */
export async function createMenager() {
  try {
    const riddles = await loadRiddleDatabase();
    const newObj = createRiddle(riddles);
    riddles.push(newObj);
    await writeRiddlesToFile(riddles);
  }
  catch (err) {
    throw new Error(chalk.red("Error: " + err.message));
  }

}

await createMenager()