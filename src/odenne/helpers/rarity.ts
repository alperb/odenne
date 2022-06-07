/**
 * RarityManager
 * Author: Alper Berber <berber@sabanciuniv.edu>
 * Version: 1.0.0
 */
export default class Rarity {
    defaultDifficulty: number;

    constructor(){
        this.defaultDifficulty = 0; // to the power (difficulty + 1)
    }

    /**
     * Generates a random number in the given range (inclusive)
     * @param {Number} min Minimum number
     * @param {Number} max Maximum number
     * @param {Number} difficulty Difficulty of the random generator, default is 0, increment for harder, decrement for easier (max dec: -2)
     */
    rand(min: number, max: number, difficulty = this.defaultDifficulty){
        difficulty += 3;
        let possibilityMap = this.mapPossibilites(min, max, difficulty);
        let generatedRandom = this.generateRandom(min, max, difficulty);
        return this.finder(generatedRandom, possibilityMap);
    }

    /**
     * Finds the given number inside map and returns the value
     * @param {Number} value Value to find
     * @param {Map} map Map that contains rarity ranges
     * @returns {Number} Random number in the desired range
     */
    finder(value: number, map: Map<number[], number>){
        for(const key of map.keys()){
            if(value >= key[0] && value <= key[1]) return map.get(key);
        }
    }

    /**
     * 
     * @param {Number} min Minimum number
     * @param {Number} max Maximum number
     * @param {Number} difficulty Difficulty of the random generator
     * @returns {Map} Map of the possibilities
     */
    mapPossibilites(min: number, max: number, difficulty: number){
        let map = new Map();

        let lastStartPoint = Math.pow(min, difficulty);
        for(let i = 0; i <= (max-min); i++){
            // determine range
            let valueRange = [lastStartPoint, lastStartPoint + ( Math.pow(max-i, difficulty) - Math.pow(max-i-1, difficulty) ) - 1]

            // assign max value for the next iteration
            lastStartPoint = valueRange[1] + 1;

            // check for max^difficulty value
            valueRange[1] = valueRange[1] > Math.pow(max, difficulty) ? Math.pow(max, difficulty) : valueRange[1];

            map.set(valueRange, min+i);

            // for testing
        }
        return map;
    }

    /**
     * Generates a random in the possibility range
     * @param {Number} min Minimum number
     * @param {Number} max Maximum number
     * @param {Number} difficulty Difficulty of the random generator
     * @param {Number} bias Bias of the randomizer (not working)
     * @returns {Number} Randomly generated number in possibility range
     */
    generateRandom(min: number, max: number, difficulty: number, bias = 0){
        // let sum = 0;
        // for(let i = 0; i < Math.pow(difficulty, difficulty); i++){
        //     let randomNumber = (Math.random() * (Math.pow(max, difficulty) - Math.pow(min, difficulty))) + Math.pow(min, difficulty) + 1;
        //     sum += randomNumber;
        // }
        // sum = Math.floor(sum / Math.pow(difficulty, difficulty));
        // return sum;

        let randomNumber = (Math.random() * (Math.pow(max, difficulty) - Math.pow(min, difficulty))) + Math.pow(min, difficulty) + 0.1;
        return Math.floor(randomNumber)
    }
}