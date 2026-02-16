import express from "express";
import type{Request, Response} from "express";
import { AppDataSource } from "../data-source.js";
import {User} from "../entity/User.js"

const router = express.Router();

router.post("/usuario",async(req:Request, res:Response)=>{
    try{

    const { name, email, situationId } = req.body;

    const userRepository = AppDataSource.getRepository(User);

    const newUser = userRepository.create({
      name,
      email,
      situation: { id: situationId },
    });

        await userRepository.save(newUser);

        res.status(201).json({
            messagem: "Usuario cadastrado com sucesso!",
            user: newUser,
        });

    }
    catch(error)
    {
        res.status(404).json({
            messagem: "Error ao cadastradar usuario!"
        });
    }
});


router.get("/usuario",async(req:Request, res:Response)=>{

    try{
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.find();

    res.status(200).json(user);
    return
    }
    catch(error){
        res.status(404).json({
            messagem: "Error ao listar usuarios!"
        });
        return
    }
});

export default router