export default class Statistics {
    callback;
    words;
    constructor(callback){
        this.callback = callback;
    }

    getTimeDelta = () => {
        let start = new Date().getMilliseconds();
        this.words = this.callback();
        let end = new Date().getMilliseconds();
        return end - start;
    }

    getUnique = () => {
        let ws = {};
        let wsa = [];
        this.words.split(', ').forEach( w => {
            if(!ws[w]) ws[w] = true, wsa.push(w);
        });
        return wsa.join(', ');
    }   
}