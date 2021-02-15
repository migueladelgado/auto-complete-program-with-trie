export default class Trie {
    //subtract this value to get indices starting at 0
    CHAR_INDEX_OFFSET = 97;
    rootNode;
    prefix;
    matches = [];

    constructor(words) {
        this.rootNode = this.TrieNode();
        if(words) this.build(words);
    }

    //getting charcode index / values
    charToIndex = c => c.charCodeAt(0) - this.CHAR_INDEX_OFFSET;
    indexToChar = i => String.fromCharCode(i + this.CHAR_INDEX_OFFSET);

    //populate children for new trie nodes
    getChildren = () => {
        let a = [], max = 26;
        for(let i = 0; i < max; i++) a.push(null);
        return a;
    }

    //Create new trie nodes
    TrieNode = () => ({ isEndOfWord: false, children: this.getChildren() }); 

    //adding new words to our trie structure
    add = word => {
        let node = this.rootNode, i = 0;
        for(let j = 0; j < word.length; j++){
            i = this.charToIndex(word[j]);
            if(node.children[i] == null)
                node.children[i] = this.TrieNode();
            node = node.children[i];
        }
        node.isEndOfWord = true;
    }

    //checking if the word exists
    exists = word => {
        let node = this.rootNode, i = 0;
        for(let j = 0; j < word.length; j++) {
            i = this.charToIndex(word[j]);
            if(node.children[i] == null) return false;
            node = node.children[i];
        }
        return node.isEndOfWord;
    }


    crawl = (curr, cIndex, cTxt = '') => {
        if(curr.isEndOfWord) 
            this.matches.push(cTxt += this.indexToChar(cIndex));
        for(let i = 0; i < curr.children.length; i++){
            if(curr.children[i])
                this.crawl(curr.children[i], i, cTxt + this.indexToChar(cIndex))
        }
    }

    //build trie
    build = words => {
        words.forEach( word => this.add(word));
    }

    getMatches = () => {
        return this.matches.map(
            m => this.prefix + m
        ).join(
            ', '
        )
    }

    //predict
    predict = (chars) => {
        this.prefix = chars;
        let currentNode = this.rootNode;
        let i = 0;
        //go to current level of tree
        for(let c = 0; c < chars.length; c++){
            i = this.charToIndex(chars[c]);
            if(currentNode.children[i] == null) return false;
            currentNode = currentNode.children[i];
        }

        // go through children
        currentNode
            .children.forEach((node, index) => {
                if(node)
                    this.crawl(node, index);
        });
        return this;
    }

}