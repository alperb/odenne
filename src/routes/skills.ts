import { Router } from "express";
import { OriginalSkill } from "../odenne/types/player";

const skillRouter = Router();
import skillConfig from '../odenne/config/skills.json';

skillRouter.post('/get', (req, res, next) => {
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
            response: 0
        })
    }
})
export default skillRouter;