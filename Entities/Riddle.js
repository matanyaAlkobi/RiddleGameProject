
import readline from "readline-sync";

const name = readline.question('What is your name? ');
console.log(`Hello, ${name}!`);





class  Riddles {
    constructor(ID, name, taskDescription,correctAnswer){
    this.ID = ID;
    this.name =  name;
    this.taskDescription = taskDescription;
    this.correctAnswer = correctAnswer;
    }

    ask(){
        do{
        console.log(`question number ${this.ID}:  ${this.taskDescription}`)
        const answer = readline.question("What is your answer to the question? ")
        if(answer != correctAnswer){
            
        }
        }
        while(answer != correctAnswer)


    }

}