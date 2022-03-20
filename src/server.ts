import {config} from 'dotenv';
config();
import express from 'express';

const app = express();

import battleRouter from './routes/battle';
import skillRouter from './routes/skills';

app.use('/battle', battleRouter);
app.use('/skill', skillRouter);

app.listen(process.env.PORT, () => {
    console.log(`Odenne is up at :${process.env.PORT}`)
});