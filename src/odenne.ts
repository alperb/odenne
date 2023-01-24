/**
 * Odenne
 * Authors: 
 * - Alper Berber <berber@sabanciuniv.edu> 
 * - Edip Emre Bodur <edipemre.bodur@bahcesehir.edu.tr>
 * Version: 1.0.5
 */

import OdenneOptions from './helpers/options';

// Odenne bound helpers
import Exceptions from './helpers/exceptions';
import Status from './helpers/status';
import Teams, { Team } from './lib/teams';
import Keeper from './lib/keeper';
import Referee from './lib/referee';
import Environments from './lib/environments';
import Effects from './lib/effects';    
import Skills from './lib/skills';
import Rounds from './lib/rounds';
import OdenneUI from './lib/ui';
import Rarity from './helpers/rarity';
import Modifiers from './lib/modifiers';
import SkillConfig from './config/skills.json';
import { STATUSCODES } from './types/types';
import { OriginalSkill } from './types/player';
import Narrator from './lib/narrator';
import Statistics from './lib/statistics';
import OdenneSpace from './helpers/space';
import BonusFactory from './lib/bonuses';

export class Odenne {
    static space: OdenneSpace = new OdenneSpace();
    exceptions: {[key: string]: string};
    status: Status;
    options: OdenneOptions;
    Teams: Teams;
    Referee: Referee;
    Keeper: Keeper;
    Environments: Environments;
    Effects: Effects;
    Skills: Skills;
    Rounds: Rounds;
    Rarity: Rarity;
    UI: OdenneUI;
    Modifiers: Modifiers;
    SkillConfig: OriginalSkill[];
    Narrator: Narrator;
    Statistics: Statistics;
    BonusFactory: BonusFactory;

    teams: Array<Team> = [];

    /**
     * Constructs a new Odenne
     * @param {OdenneOptions} options Options for Odenne to prepare
     */
    constructor(options: OdenneOptions){
        // initialize structural helpers
        this.exceptions = Exceptions;
        this.status = new Status(this);
        this.Rarity = new Rarity();
        
        this.options = options;
        this.validateOptions();

        // initialize game helpers
        this.Environments = new Environments(this);
        this.Teams = new Teams(this);
        this.Referee = new Referee(this);
        this.Keeper = new Keeper(this);
        this.Effects = new Effects(this);
        this.Skills = new Skills(this);
        this.Rounds = new Rounds(this);
        this.UI = new OdenneUI(this);
        this.Modifiers = new Modifiers(this);
        this.Narrator = new Narrator(this);
        this.Statistics = new Statistics(this);
        this.BonusFactory = new BonusFactory(this);
        this.SkillConfig = SkillConfig;
        
        this.prepare();
    }

    prepare(){
        try{
            this.prepareTeams();
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch(err: any){
            this.status.set(this.status.codes.ERRORED);
            this.status.setError(err);
            throw this.exceptions.PREPARE_FAILED;
        }
    }

    prepareTeams(){
        this.teams = [(this.Teams.createTeam()), (this.Teams.createTeam())];
        
        for(let i = 0; i < this.options.teams.length; i++){
            for(const player of this.options.teams[i]){
                this.teams[i].addPlayer(player);
            }
        }
    }

    validateOptions(){
        if(!(this.options instanceof OdenneOptions)){
            throw this.exceptions.UNDEFINED_OPTIONS;
        }
        else{
            this.status.set(this.status.codes.PREPARING);
        }
    }

    start(){
        if(this.status.get() === STATUSCODES.PREPARING){
            this.Referee.prepareStart();
            this.Statistics.prepareTeams();
        }
        else {
            this.status.set(this.status.codes.ERRORED);
            this.status.setError(undefined);
            throw this.exceptions.START_STATUS_CHECK_FAILED;
        }
    }

    advance(){
        if(this.status.get() !== STATUSCODES.STARTED)
            throw this.exceptions.INVALID_GAME_STATUS_FOR_ADVANCING;
        this.Referee.createRound();
        
        this.Referee.runRound();
        this.Referee.checkGameStatus();
    }

}





export default Odenne;