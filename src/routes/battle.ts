import { Router } from "express";   
import OdenneOptions from "../odenne/helpers/options";
import Odenne from '../odenne/odenne';
import { OriginalPlayer } from "../odenne/types/player";
import { STATUSCODES } from "../odenne/types/types";

const battleRouter = Router();

battleRouter.post('/duel', (req, res) => {
    try{
        const battleOptions = new OdenneOptions().setRoundLimit(11);
        if(req.body.options){
            if(req.body.options.overwriteHealth){
                battleOptions.overwriteHealth(0, 0, req.body.options.overwriteHealth[2]);
                battleOptions.calculateItemStats(0, false);
            }
        }
        // prepare teams
        for(const team in req.body.teams){
            for(const player of req.body.teams[team]){
                battleOptions.addToTeam(parseInt(team), player as OriginalPlayer);
            }
        }

        // const start = Date.now();
        const battle = new Odenne(battleOptions);
        battle.start();
        while(battle.status.get() === STATUSCODES.STARTED){
            battle.advance();
        }
        // console.log(`Took ${Date.now() - start}ms`);

        const bulkLog = battle.UI.getBulkLog();
        const response = {
            result: 1,
            logs: bulkLog,
            end: battle.Referee.result,
            stats: battle.Statistics.teams
        }
        res.json(response);
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            result: 0
        })
    }
    

});

export default battleRouter;