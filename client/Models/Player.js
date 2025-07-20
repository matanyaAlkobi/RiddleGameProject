/**
 * Represents a player in a game, tracking their response times.
 */
export class Player{
    /**
     * Creates a new Player instance.
     * @param {string} name - The name of the player.
     */
    constructor(name,answeredRiddles){
        this.name = name;
        this.times = [];
        this.answeredRiddles = answeredRiddles;
    }

        /**
     * Records the time taken to answer a question.
     * @param {number} start - The start timestamp (in ms).
     * @param {number} end - The end timestamp (in ms).
     */
    recordTime(start, end){
        this.times.push(end - start)
    }

        /**
     * Displays and returns the total and average response times.
     * @returns {{total: number, avg: number}} - Total and average time in seconds.
     */
    showStatus(){
        let total =  this.times.reduce((acc,curr) =>  acc + curr,0);
        total = total / 1000
        console.log(`Total time taken to answer all questions: ${total} secondes`);
        const avg = total / this.times.length;
        console.log(`Average time taken to answer each question: ${avg} secondes`)
        return {total,avg}
    }
}

