export class Player{
    constructor(name){
        this.name = name;
        this.times = [];
    }

    recordTime(start, end){
        this.times.push(end - start)
    }

    showStatus(){
        let total =  this.times.reduce((acc,curr) =>  acc + curr,0);
        total = total / 1000
        console.log(`Total time taken to answer all questions: ${total} secondes`);
        const avg = total / this.times.length;
        console.log(`Average time taken to answer each question: ${avg} secondes`)
        return {total,avg}
    }
}

