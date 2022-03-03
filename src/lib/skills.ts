import Odenne from "../odenne";
import { OriginalSkill } from "../types/player";
import { Player } from "./teams";

export default class Skills {
    Odenne: Odenne;

    constructor(Odenne: Odenne){
        this.Odenne = Odenne;
    }

    create(Player: Player, skill: OriginalSkill){
        switch(skill.id){
            case 0:
                Player.player.skills.push(new BasicAttack(Player, skill));
        }
    }
}

export abstract class Skill {
    skill!: OriginalSkill;
}

export abstract class ActiveSkill extends Skill {
    skill!: OriginalSkill;
    roundType: string = 'attack';
}

export abstract class AttackSkill extends ActiveSkill {}
export abstract class DefenseSkill extends ActiveSkill {}

export class BasicAttack extends AttackSkill {
    skill!: OriginalSkill;
    roundType: string = 'attack';
    player: Player;

    constructor(Player: Player, skill: OriginalSkill){
        super();
        this.skill = skill;
        this.player = Player;
    }
    
}

