import { Request, Response, Router } from "express";
import { OriginalSkill } from "../odenne/types/player";

const skillRouter = Router();
import skillConfig from '../odenne/config/skills.json';
import { GetSkillRequest } from "../types/requests";

skillRouter.post('/get', (req: Request<Record<string, unknown>, Record<string, unknown>, GetSkillRequest>, res: Response) => {
    try{
        const wantedSkills: number[] = req.body.skills;
        const filtered: OriginalSkill[] = [];
        for(const skillId of wantedSkills){
            const skillFilter = skillConfig.filter(s => skillId === s.id);
            if(skillFilter.length > 0) filtered.push(skillFilter[0]);
            else filtered.push({id: -1, name: 'Not a Skill'})
        }

        const response = {
            result: 1,
            skills: filtered
        }
        res.json(response);
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            result: 0
        })
    }
})
export default skillRouter;