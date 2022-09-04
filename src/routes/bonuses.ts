import { Request, Response, Router } from "express";

const bonusRouter = Router();
import BonusFactory from "../odenne/lib/bonuses";
import { GetSetBonusesRequest } from "../types/requests";

bonusRouter.post('/', (req: Request<Record<string, unknown>, Record<string, unknown>, GetSetBonusesRequest>, res: Response) => {
    try{
        const setCounts = req.body;
        const bonuses = BonusFactory.getBonusesFromGivenCounts(setCounts);
        res.json({
            result: 'success',
            bonuses
        });
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            result: 'error'
        })
    }
})
export default bonusRouter;