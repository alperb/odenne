import { Player } from "../lib/teams";

export default class OdenneSpace {
    space: Map<string, Player[]>;

    constructor(){
        this.space = new Map();
    }

    set(key: string, value: Player[]){
        this.space.set(key, value);
    }

    update(key: string, value: Player){
        this.space.set(key, (this.get(key) ?? []).concat(value));
    }

    get(key: string){
        return this.space.get(key);
    }

    has(key: string){
        return this.space.has(key);
    }
}