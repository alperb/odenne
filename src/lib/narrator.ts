import Odenne from "../odenne";
import { DamageDone } from "../types/types";
import { Effect } from "./effects";
import { Log } from "./keeper";
import { Skill } from "./skills";
import { Player } from "./teams";

export default class Narrator {
    Odenne: Odenne;
    Log!: Log;
    events: Event[];
    constructor(Odenne: Odenne){
        this.Odenne = Odenne;

        this.events = [];
    }

    generate(): void{
        this.Log = this.Odenne.Keeper.logs[this.Odenne.Keeper.logs.length - 1];
        for(const summary of this.Log.summaries){
            for(const damageDone of summary.damageTaken){
                this.events.push(new DamageEvent(damageDone));
            }
        }

        this.prioritize();

        const selectedEvent = this.getPriorityEvent();

        this.Odenne.UI.saveRound(selectedEvent, this.Log);

        this.clear();
    }

    getPriorityEvent(){
        for(const event of this.events){
            if(event.isLogAvailable()) return event;
        }

        return new BilganEvent();
    }

    prioritize(){
        this.sortBySourceType();
    }

    sortBySourceType(){
        this.events = this.events.sort(this.sortHelper)
    }

    sortHelper(a: Event, b: Event): number{
        if(a.source instanceof Skill){
            return -1
        }
        else if(b.source instanceof Skill){
            return 1
        }

        return -1
    }

    private clear(){
        this.events = [];
    }

    // TODO: BATMAN
}

export abstract class Event{
    source!: Skill | Effect;

    constructor(){} 

    abstract getLog(): string;

    abstract isLogAvailable(): boolean;
}

export class BilganEvent extends Event{
    constructor(){
        super();
    }

    getLog(): string {
        return "anan nasil moruk.";
    }

    isLogAvailable(): boolean {
        return true
    }
}

export class DamageEvent extends Event{
    damageDone: DamageDone;

    constructor(damageDone: DamageDone){
        super();

        this.damageDone = damageDone;
        this.source = damageDone.source.source;
    }

    getLog(): string {
        const cancelledPart = this.damageDone.cancel.isCancelled ? `but ${this.damageDone.cancel.sourceMember?.original.name} dodged` : ``;
        return `${this.damageDone.source.player.original.name} dealt ${this.damageDone.damage} with ${(this.damageDone.source.source as Skill).skill.name} ${cancelledPart}`;
    }

    isLogAvailable(): boolean {
        return true;
    }
}