import Odenne from "../odenne";
import { DamageDone, EventLog, EventParameters, EventTypes, TurnTypes } from "../types/types";
import { Effect } from "./effects";
import { Log } from "./keeper";
import { Skill } from "./skills";
import { Player } from "./teams";

export default class Narrator {
    Odenne: Odenne;
    Log!: Log;
    events: EventLog[];
    templates: Map<number, string>;
    constructor(Odenne: Odenne){
        this.Odenne = Odenne;

        this.events = [];
        this.templates = new Map<number, string>([
            [EventTypes.DAMAGE, "{{attacker}} dealt {{damage}} with {{skill}}"],
            [EventTypes.DODGE, "{{attacker}} dealt {{damage}} with {{skill}} but {{defender}} dodged"]
        ])
    }

    private shouldAcceptLog(event: EventParameters){
        // TODO: TBC
        return true;
    }

    private createLog(event: EventParameters){
        let template = this.templates.get(event.type) as string;

        for(const key of Object.keys(event)){
            if(key === "type" || !key) continue;

            template = template.replace(`{{${key}}}`, event[key].toString());
        }

        return template;
    }

    saveEvent(event: EventParameters){
        if(this.shouldAcceptLog(event)){
            const log = this.createLog(event);
            const newEvent: EventLog = {type: event.type, log}
            this.events.push(newEvent);
        }
    }

    generate(): void{
        this.Odenne.UI.saveRound(this.events[0], this.Log);

        this.clear();
    }

    // getPriorityEvent(){
    //     for(const event of this.events){
    //         if(event.isLogAvailable()) return event;
    //     }

    //     return new BilganEvent();
    // }

    // prioritize(){
    //     this.sortBySourceType();
    // }

    // sortBySourceType(){
    //     this.events = this.events.sort(this.sortHelper)
    // }

    // sortHelper(a: Event, b: Event): number{
    //     if(a.source instanceof Skill){
    //         return -1
    //     }
    //     else if(b.source instanceof Skill){
    //         return 1
    //     }

    //     return -1
    // }

    private clear(){
        this.events = [];
    }
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
        return `${this.damageDone.source.player.original.name} dealt ${this.damageDone.damage} with ${(this.damageDone.source.source as Skill).skill?.name} ${cancelledPart}`;
    }

    isLogAvailable(): boolean {
        return true;
    }
}