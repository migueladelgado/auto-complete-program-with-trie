import { performance } from 'perf_hooks';
export default class Statistics {
    callback;
    words;
    constructor(callback){
        this.callback = callback;
    }

    getTimeDelta = () => {
        let start = performance.now();
        this.words = this.callback();
        let end = performance.now();
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