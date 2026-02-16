import express from "express";
import type{Request, Response} from "express";
import { AppDataSource } from "../data-source.js";
import {Situation} from "../entity/Situation.js"


const router = express.Router();

//cadastrar
router.post("/situacao",async(req:Request, res:Response)=>{
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
        res.status(404).json({
            messagem: "Error ao cadastradar situação!"
        });
    }
});
//listar
router.get("/situacao",async(req:Request, res:Response)=>{

    try{
    const situationRepository = AppDataSource.getRepository(Situation);
    const situations = await situationRepository.find();

    res.status(200).json(situations);
    return
    }
    catch(error){
        res.status(500).json({
            messagem: "Error ao listar situações!"
        });
        return
    }
});
//listar por id
router.get("/situacao/:id",async(req:Request, res:Response)=>{

    try{
    const id = Number(req.params.id);
    const situationRepository = AppDataSource.getRepository(Situation);
    const situation = await situationRepository.findOneBy({id});

    if(!situation){
        return res.status(404).json({
            messagem: "Id da situação não encontrada!"
        })
    }

    res.status(200).json(situation);
    return
    }
    catch(error){
        res.status(500).json({
            messagem: "Algo deu errado no processamento!"
        });
        return
    }
});
//atualizar
router.put("/situacao/:id",async(req:Request, res:Response)=>{

    try{
    const id = Number(req.params.id);
    const data = req.body;
    const situationRepository = AppDataSource.getRepository(Situation);
    const situation = await situationRepository.findOneBy({id});

    if(!situation){
        return res.status(404).json({
            messagem: "Id da situação não encontrada!"
        })
    }

    situationRepository.merge(situation, data);

    const update = await situationRepository.save(situation);

    res.status(200).json({
        messagem: "Situação atualizada com sucesso!",
        situation: update
    });

    }
    catch(error){
        res.status(500).json({
            messagem: "Algo deu errado no processamento!"
        });
        return
    }
});

//deletar
router.delete("/situacao/:id",async(req:Request, res:Response)=>{

    try{
    const id = Number(req.params.id);
    const situationRepository = AppDataSource.getRepository(Situation);
    const situation = await situationRepository.findOneBy({id});

    if(!situation){
        return res.status(404).json({
            messagem: "Id da situação não encontrada!"
        })
    }

    await situationRepository.remove(situation);

    res.status(200).json({
        messagem: "Situação removida com sucesso!",
    });

    }
    catch(error){
        res.status(500).json({
            messagem: "Algo deu errado no processamento!"
        });
        return
    }
});

export default router