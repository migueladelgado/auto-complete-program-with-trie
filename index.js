import { build, predict } from './trie.js';
import data from './data.js';

// build(data);
// var results = predict()
// console.log(results)

let d = ['mache', 'matter', 'matilda', 'hello', 'hi'];


build(d);
let testChars = "m";

/**
 * Method 1: check each string in the list and return all the words that start with specific chars
 * @param {*} chars 
 */
const searchWordList = chars => {
    let wordsFound = [];
    d.forEach( word => {
        if( word.substr(0, chars.length) === chars ) 
            wordsFound.push(word);
    });

    return wordsFound.join(', ');
}

const searchWordsTrie = chars => predict(chars).join(', ');



let method1Results = searchWordList(testChars);
let method2Results = searchWordsTrie(testChars);
console.log(method1Results)
console.log('--')
console.log(method2Results)


