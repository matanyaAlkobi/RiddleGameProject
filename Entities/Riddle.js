
import chalk from "chalk";
import readline from "readline-sync";






export class Riddle {
    constructor(ID, name, taskDescription,correctAnswer){
    this.ID = ID;
    this.name =  name;
    this.taskDescription = taskDescription;
    this.correctAnswer = correctAnswer;
    }

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
}
