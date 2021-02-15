/**
 * Functions for building and searching trie
 */

//populate children for new trie nodes
const getChildren = () => {
    let a = [], max = 26;
    for(let i = 0; i < max; i++) a.push(null);
    return a;
}
//subtract this value to get indices starting at 0
const CHAR_INDEX_OFFSET = 97;

//getting charcode index / values
const charToIndex = c => c.charCodeAt(0) - CHAR_INDEX_OFFSET;
const indexToChar = i => String.fromCharCode(i + CHAR_INDEX_OFFSET);

//Create new trie nodes
const TrieNode = () => ({ isEndOfWord: false, children: getChildren() }); 

//create the root node
let rootNode = TrieNode();

//adding new words to our trie structure
const add = word => {
    let node = rootNode, i = 0;
    for(let j = 0; j < word.length; j++){
        i = charToIndex(word[j]);
        if(node.children[i] == null)
            node.children[i] = TrieNode();
        node = node.children[i];
    }
    node.isEndOfWord = true;
}

//checking if the word exists
const exists = word => {
    let node = rootNode, i = 0;
    for(let j = 0; j < word.length; j++) {
        i = charToIndex(word[j]);
        if(node.children[i] == null) return false;
        node = node.children[i];
    }
    return node.isEndOfWord;
}

let a = []

function crawl(curr, cIndex, cTxt = ''){
    if(curr.isEndOfWord) 
        a.push(cTxt += indexToChar(cIndex));
    for(let i = 0; i < curr.children.length; i++){
        if(curr.children[i])
            crawl(curr.children[i], i, cTxt + indexToChar(cIndex))
    }
}

//build trie
export const build = words => {
    words.forEach( word => add(word));
    return rootNode;
}

//predict
export const predict = (chars) => {
    let possibilities = [];
    let currentNode = rootNode;
    let i = 0;

    //go to current level of tree
    for(let c = 0; c < chars.length; c++){
        i = charToIndex(chars[c]);
        if(currentNode.children[i] == null) return false;
        currentNode = currentNode.children[i];
    }

    // go through children
    currentNode
        .children.forEach((node, index) => {
            let tail = '';
            if(node){
                crawl(node, index);
                possibilities.push(a)
            }    
    });
    return possibilities;
}

