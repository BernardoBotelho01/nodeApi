import express from "express";
import type{Request, Response} from "express";
import { AppDataSource } from "../data-source.js";
import {Situation} from "../entity/Situation.js"


const router = express.Router();


router.post("/situations",async(req:Request, res:Response)=>{
    try{

        var data = req.body;
        const situationRepository = AppDataSource.getRepository(Situation);
        const newSituation = situationRepository.create(data);

        await situationRepository.save(newSituation);

        res.status(201).json({
            messagem: "Situação cadastrada com sucesso!",
            situation: newSituation,
        });

    }
    catch(error)
    {
        res.status(500).json({
            messagem: "Error ao cadastrada situação!"
        });
    }
})

export default router