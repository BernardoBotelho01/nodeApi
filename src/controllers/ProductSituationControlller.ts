import express from "express";
import type{Request, Response} from "express";
import { AppDataSource } from "../data-source.js";
import {ProductSituation} from "../entity/ProductSituation.js"

const router = express.Router();

router.post("/situacaoproduto",async(req:Request, res:Response)=>{
    try{

        var data = req.body;
        const productSituationRepository = AppDataSource.getRepository(ProductSituation);
        const newProductSituation = productSituationRepository.create(data);

        await productSituationRepository.save(newProductSituation);

        res.status(201).json({
            messagem: "Situação do produto cadastrada com sucesso!",
            productSituation: newProductSituation,
        });

    }
    catch(error)
    {
        res.status(404).json({
            messagem: "Error ao cadastradar situação do produto!"
        });
    }
});


export default router