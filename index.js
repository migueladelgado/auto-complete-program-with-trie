import Trie from './trie.js';
import Statistics from './statistics.js';
import data from './data.js';


let words = [];

for(let i = 0; i < 100; i++) {
    words = words.concat(data);
}

console.log('word count: ', words.length)

const prefix = "mo";
/**
 * Method 1: check each string in the list and return all the words that start with specific chars
 */
const searchWordList = () => {
    let wordsFound = [];
    words.forEach( word => {
        if( word.substr(0, prefix.length) === prefix ) 
            wordsFound.push(word);
    });

    return wordsFound.join(', ');
}

//construct trie
let trie = new Trie(words);

/**
 * Method 2: traverse the trie to find matching words
 */
const searchWordsTrie = () => trie.predict(prefix).getMatches();

/**
 * RESULTS
 */

let m1 = new Statistics(searchWordList);
let r1 = m1.getTimeDelta();
console.log('Method 1: ', r1, 'milliseconds');
console.log(m1.getUnique())

let m2 = new Statistics(searchWordsTrie);
let r2 = m2.getTimeDelta();
console.log('Method 2: ', r2, 'milliseconds');
console.log(m2.words)



