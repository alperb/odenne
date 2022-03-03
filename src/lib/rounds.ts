import Odenne from "../odenne";
import { TurnTypes } from "../types/types";

export default class Rounds {
    Odenne: Odenne;


    constructor(Odenne: Odenne){
        this.Odenne = Odenne;
    }

    create(type: TurnTypes): Round{
        if(type === TurnTypes.ATTACK){
            return new AttackRound(this.Odenne);
        }
        else return new DefenseRound(this.Odenne);;
    }
}

export abstract class Round {
    Odenne: Odenne;
    constructor(Odenne: Odenne){
        this.Odenne = Odenne;
    }
}

export class AttackRound extends Round {
    constructor(Odenne: Odenne){
        super(Odenne);
    }
}

export class DefenseRound extends Round {
    constructor(Odenne: Odenne){
        super(Odenne);
    }
}