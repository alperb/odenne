import Odenne from "..";

export default class Environments {
    Odenne: Odenne;

    constructor(Odenne: Odenne){
        this.Odenne = Odenne;
    }

    create(name: string): Environment | undefined{
        switch(name){
            case 'default':
                return new Default(this.Odenne);
            default:
                return undefined;
        }
    }
}

export abstract class Environment {
    Odenne!: Odenne;
}

export class Default implements Environment {
    Odenne: Odenne;

    constructor(Odenne: Odenne){
        this.Odenne = Odenne;
    }
}