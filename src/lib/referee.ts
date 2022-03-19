import Odenne from '../odenne';
import { GetRandomPlayerOptions, OdenneTurn, STATUSCODES, TurnTypes } from '../types/types';
import { Round } from './rounds';
import { Player } from './teams';

class Referee {
    Odenne: Odenne;
    turn!: OdenneTurn;
    roundCount: number;
    currentRound!: Round;

    constructor(Odenne: Odenne){
        this.Odenne = Odenne;
        this.roundCount = 0;
    }

    createRound() {
        this.switchTurn();
        const round = this.Odenne.Rounds.create(this.turn.type);
        this.currentRound = round;
        this.roundCount++;
    }

    switchTurn(){
        const newtype = TurnTypes.ATTACK;
        const newteam = this.alternate(this.turn.team);
        const newplayer = this.getRandomPlayer(newteam);

        this.turn = {
            type: newtype,
            team: newteam,
            player: newplayer
        }
    }

    private alternate(val: number): number {
        if(val == 0) return 1;
        else if(val == 1) return 0;
        else return 0;
    }

    getRandomPlayer(teamIndex: number, options: GetRandomPlayerOptions = {considerTaunt: false}): {id: number, player: Player} {
        if(options.considerTaunt){
            for(let i = 0; i < this.Odenne.teams[teamIndex].players.length; i++){
                if(this.Odenne.teams[teamIndex].players[i].hasEffect("Taunt")){
                    return {
                        id: i,
                        player: this.Odenne.teams[ teamIndex ].players[ i ]
                    }
                }
            }
        }
        
        const playerCount = this.Odenne.teams[ teamIndex ].players.length;
        const randomized = Math.floor(Math.random() * playerCount);
        return {
            id: randomized,
            player: this.Odenne.teams[ teamIndex ].players[ randomized ]
        }
    }

    runRound(){
        this.currentRound.simulate();
    }

    checkGameStatus(){
        const roundLimitExceeded = this.roundCount >= this.Odenne.options.roundLimit;
        const isAllPlayersDead = this.Odenne.teams[0].isAllPlayersDead() || this.Odenne.teams[1].isAllPlayersDead();
        const conditions = [
            roundLimitExceeded,
            isAllPlayersDead
        ]

        if(conditions.some(d => d)){
            this.Odenne.status.set(STATUSCODES.FINISHED);
            this.cleanUpGameVariables();
        }
    }

    applyRound(){
        for(const team of this.Odenne.teams){
            team.applyRound();
        }
    }

    clearRound(){
        for(const team of this.Odenne.teams){
            team.clear();
        }
    }

    applyDamage(){
        for(const team of this.Odenne.teams){
            team.applyDamage();
        }
    }

    applyShield(){
        for(const team of this.Odenne.teams){
            team.applyShield();
        }
    }

    cleanUpGameVariables(){

    }

    preparePassives(){
        for(const team of this.Odenne.teams){
            team.runPassiveSkills();
        }
    }

    prepareStart(){
        this.turn = {
            type: TurnTypes.ATTACK,
            team: 1,
            player: this.getRandomPlayer(1)
        };


        this.preparePassives();
        this.Odenne.status.set(STATUSCODES.STARTED);
    }
}
export default Referee;