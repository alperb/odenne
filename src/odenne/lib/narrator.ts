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
    priority: EventTypes[];

    constructor(Odenne: Odenne){
        this.Odenne = Odenne;

        this.events = [];
        this.templates = new Map<number, string>([
            [EventTypes.DAMAGE, "{{ attacker }} dealt {{ damage }} with {{ skill }}"],
            [EventTypes.REFLECT, "{{ defender }} reflected {{ damage }} with {{ skill }}"],
            [EventTypes.DAMAGE_AND, "{{ attacker }} dealt {{ damage }} with {{ skill }} and {{ reason }}"],
            [EventTypes.DAMAGE_CANCEL, "{{ attacker }} dealt {{ damage }} with {{ skill }} but {{ defender }} {{ reason }}"],
            [EventTypes.CC, "{{ attacker }} was {{ skill }}"],
            [EventTypes.STATS_INCREASE, "{{ attacker }} gained {{ statvalue }} {{ stattype }} with {{ skill }}"],
            [EventTypes.INVULNERABLE, "{{ attacker }} became invulnerable"]
        ]);

        this.priority = [
            EventTypes.CC,
            EventTypes.INVULNERABLE,
            EventTypes.REFLECT,
            EventTypes.DAMAGE_CANCEL,
            EventTypes.DAMAGE_AND,
            EventTypes.DAMAGE,
            EventTypes.STATS_INCREASE
        ]
    }

    private shouldAcceptLog(event: EventParameters){
        const eventTypeIndex = this.priority.indexOf(event.type);
        for(const currentEvent of this.events){
            if(eventTypeIndex >= this.priority.indexOf(currentEvent.type)){
                
                return false;
            }
        }
        return true;
    }

    private createLog(event: EventParameters){
        let template = this.templates.get(event.type) as string;

        for(const key of Object.keys(event)){
            if(key === "type" || !key) continue;

            template = template.replace(`{{ ${key} }}`, event[key].toString());
        }
        console.log({template})
        return template;
    }

    saveEvent(event: EventParameters){
        if(this.shouldAcceptLog(event)){
            const log = this.createLog(event);
            const newEvent: EventLog = {type: event.type, log}
            this.events.push(newEvent);
            this.sortByPriority();
        }
    }

    sortByPriority(){
        if(this.events.length === 1) return
        this.events.sort(this.prioritySorter);
    }

    prioritySorter(a: EventLog, b: EventLog): number {
        console.log({a, b})
        const indexA = this.priority.indexOf(a.type);
        const indexB = this.priority.indexOf(b.type);

        if(indexA > indexB) {
            return 1;
        }
        else return -1;
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