
import chalk from "chalk";
import readline from "readline-sync";

/**
 * Represents a riddle or question in the game.
 */
export class Riddle {
        /**
     * Creates a new Riddle instance.
     * @param {number} ID - The unique identifier for the riddle.
     * @param {string} name - The type or category of the riddle.
     * @param {string} taskDescription - The text of the riddle/question.
     * @param {string} correctAnswer - The correct answer to the riddle.
     * @param {string} difficulty - Difficulty level of the riddle
     */
    constructor(ID, name, taskDescription,correctAnswer, difficulty,){
    this.ID = ID;
    this.name =  name;
    this.taskDescription = taskDescription;
    this.correctAnswer = correctAnswer;
    this.difficulty = difficulty;
    }

        /**
     * Asks the riddle to the player, prompting them until the correct answer is given.
     * Displays hints for wrong answers and confirms when the answer is correct.
     */
    ask(){
        
        let answer;
        do{
        console.log(`Question type: ${this.name}`)
        console.log(`question number-${this.ID}: ${this.taskDescription}`)
        answer = readline.question("What is your answer to the question? ")
        if(answer != this.correctAnswer){
            console.log(chalk.red("wrong answer: try again"))
        }
        }
        while(answer != this.correctAnswer)
        console.log(chalk.green("Correct answer!!!"))
    }

    applyTimePenalty(){
        
    }
}
