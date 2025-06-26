export class Player{
    constructor(name){
        this.name = name;
        this.times = [];
    }

    recordTime(start, end){
        this.times.push(end - start)
    }

    showStatus(){
        const total =  this.times.reduce((acc,curr) =>  acc + curr,0);
        console.log(total);
        const avg = total / this.times.length;
        return {total,avg}
    }
}
