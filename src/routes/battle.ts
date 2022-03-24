import { response, Router } from "express";   
import OdenneOptions from "../odenne/helpers/options";
import Odenne from '../odenne/odenne';
import { OriginalPlayer } from "../odenne/types/player";
import { STATUSCODES } from "../odenne/types/types";

const battleRouter = Router();

battleRouter.post('/duel', (req, res, next) => {
    try{
        const battleOptions = new OdenneOptions().setRoundLimit(11);

        // prepare teams
        for(const team in req.body.teams){
            for(const player of req.body.teams[team]){
                battleOptions.addToTeam(parseInt(team), player as OriginalPlayer);
            }
        }

        const start = Date.now();
        const battle = new Odenne(battleOptions);
        battle.start();
        while(battle.status.get() === STATUSCODES.STARTED){
            battle.advance();
        }
        console.log(`Took ${Date.now() - start}ms`);

        const bulkLog = battle.UI.getBulkLog();
        const response = {
            result: 1,
            logs: bulkLog
        }
        res.json(response);
    }
    catch(e){
        response.json({
            result: 0
        })
    }
    

});

export default battleRouter;