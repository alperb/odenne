import { Request, Response, Router } from "express";
import { OriginalSkill } from "../odenne/types/player";

const skillRouter = Router();
import skillConfig from '../odenne/config/skills.json';
import { GetSkillRequest } from "../types/requests";

skillRouter.post('/get', (req: Request<{}, {}, GetSkillRequest>, res: Response, next) => {
    try{
        const wantedSkills: number[] = req.body.skills;
        const filtered = skillConfig.filter(s => wantedSkills.includes(s.id));

        const response = {
            result: 1,
            skills: filtered
        }
        res.json(response);
    }
    catch(e){
        res.json({
            result: 0
        })
    }
})
export default skillRouter;