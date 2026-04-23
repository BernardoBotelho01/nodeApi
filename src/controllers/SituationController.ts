import express from "express";
import type{Request, Response} from "express";
import { AppDataSource } from "../data-source.js";
import {Situation} from "../entity/Situation.js"
import { PaginationService } from "../services/PaginationService.js";
import * as yup from 'yup';
import { Not } from "typeorm";
import  verificarToken  from "../middlewares/authMiddleware.js";


const router = express.Router();

//cadastrar
router.post("/situacao",async(req:Request, res:Response)=>{
    try{

        const data = req.body;
        const schema = yup.object().shape({
            nameSituation: yup.string()
            .required("O campo nome e obrigatorio!")
            .min(3, "Campo nome deve ter no minimo 3 caracteres!")
        });
        await schema.validate(data, {abortEarly: false});

        const situationRepository = AppDataSource.getRepository(Situation);

        const existeSituacao = await situationRepository.findOne({
            where: {nameSituation: data.nameSituation}
        });

        if(existeSituacao){
           res.status(400).json({
            messagem: "Já existe uma situação cadastrada com esse nome!"
           });
           return;
        }

        const newSituation = situationRepository.create(data);

        await situationRepository.save(newSituation);

        res.status(201).json({
            messagem: "Situação cadastrada com sucesso!",
            situation: newSituation,
        });

    }
    catch(error)
    {
        if(error instanceof yup.ValidationError){
            res.status(400).json({
            messagem: error.errors
        });
        return;
        }
        
        res.status(500).json({
            messagem: "Error ao cadastradar situação!"
        });
    }
});
//listar
router.get("/situacao",async(req:Request, res:Response)=>{

    try{
    const situationRepository = AppDataSource.getRepository(Situation);
    const situations = await situationRepository.find();

//paginação

// Receber o numero da página e definir página 1 como padrão
    const page = Number(req.query.page) || 1;
//Definir o limite de registro por páginas
    const limite = Number(req.query.limite) || 10;

    const result = await PaginationService.paginate(situationRepository, page, limite, {id: "DESC"});

    res.status(200).json(result);
    return
//fim paginação

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
            messagem: "Erro ao buscar a situação pelo ID informado!"
        });
        return
    }
});
//atualizar
router.put("/situacao/:id",verificarToken, async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const situationRepository = AppDataSource.getRepository(Situation);

    const situation = await situationRepository.findOneBy({ id });

    if (!situation) {
      return res.status(404).json({
        messagem: "Id da situação não encontrada!",
      });
    }

    const { nameSituation } = req.body;

    const schema = yup.object().shape({
      nameSituation: yup
        .string()
        .required("O campo nome é obrigatório!")
        .min(3, "Campo nome deve ter no mínimo 3 caracteres!"),
    });

    await schema.validate(
      { nameSituation },
      { abortEarly: false }
    );

    const existeSituation = await situationRepository.findOne({
      where: {
        nameSituation,
        id: Not(id),
      },
    });

    if (existeSituation) {
      return res.status(400).json({
        messagem: "Já existe uma situação cadastrada com esse nome!",
      });
    }

    situationRepository.merge(situation, {
      nameSituation,
    });

    const update = await situationRepository.save(situation);

    return res.status(200).json({
      messagem: "Situação atualizada com sucesso!",
      situation: update,
    });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return res.status(400).json({
        messagem: error.errors,
      });
    }

    return res.status(500).json({
      messagem: "Erro ao atualizar a situação!",
    });
  }
});


//deletar
router.delete("/situacao/:id",verificarToken,async(req:Request, res:Response)=>{

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
            messagem: "Erro ao remover a situação!"
        });
        return
    }
});

export default router