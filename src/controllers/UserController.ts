import express from "express";
import type{Request, Response} from "express";
import { AppDataSource } from "../data-source.js";
import {User} from "../entity/User.js"
import { PaginationService } from "../services/PaginationService.js";
import * as yup from 'yup';
import { Not } from "typeorm";

const router = express.Router();
// cadastrar
router.post("/usuario",async(req:Request, res:Response)=>{
    try{

    const data = req.body;

    const schema = yup.object().shape({
      name: yup
        .string()
        .required("O campo nome é obrigatório!")
        .min(3, "O nome deve ter no mínimo 3 caracteres!"),

      email: yup
        .string()
        .required("O campo email é obrigatório!")
        .email("Informe um email válido!"),
      
      password: yup
      .string()
      .required("O campo senha e obrigatorio!")
      .min(6, "O campo senha deve ter no minimo 6 caracteres!"),

      situationId: yup
        .string()
        .required("O campo situationId é obrigatório!"),
    });

    await schema.validate(
      data,
      { abortEarly: false }
    );

    const userRepository = AppDataSource.getRepository(User);

    const existeEmail = await userRepository.findOne({
            where: {email: data.email}
        });

        if(existeEmail){
           res.status(400).json({
            messagem: "Já existe um email cadastrado com esse nome!"
           });
           return;
        }

    const newUser = userRepository.create({
      name: data.name,
      email: data.email,
      password: data.password,
      situation: { id: Number(data.situationId) },
    });

        await userRepository.save(newUser);

        res.status(201).json({
            messagem: "Usuario cadastrado com sucesso!",
            user: newUser,
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
            messagem: "Algo deu errado no processamento!"
        });
    }
});

//listar
router.get("/usuario",async(req:Request, res:Response)=>{

    try{
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.find();

    //paginação

    // Receber o numero da página e definir página 1 como padrão
        const page = Number(req.query.page) || 1;
    //Definir o limite de registro por páginas
        const limite = Number(req.query.limite) || 10;
    
        const result = await PaginationService.paginate(userRepository, page, limite, {id: "DESC"});
    
        res.status(200).json(result);
        return
    //fim paginação

    res.status(200).json(user);
    return
    }
    catch(error){
        res.status(500).json({
            messagem: "Error ao listar usuarios!"
        });
        return
    }
});
//listar por id
router.get("/usuario/:id",async(req:Request, res:Response)=>{

    try{
    const id = Number(req.params.id);
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({id});

    if(!user){
        return res.status(404).json({
            messagem: "Id do usuario não encontrado!"
        })
    }

    res.status(200).json(user);
    return
    }
    catch(error){
        res.status(500).json({
            messagem: "Algo deu errado no processamento!"
        });
        return
    }
});
//Atualizar
router.put("/usuario/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: { id },
      relations: ["situation"],
    });

    if (!user) {
      return res.status(404).json({
        messagem: "Id do usuário não encontrado!",
      });
    }

    const data = req.body;

    const schema = yup.object().shape({
      name: yup
        .string()
        .required("O campo nome é obrigatório!")
        .min(3, "O nome deve ter no mínimo 3 caracteres!"),

      email: yup
        .string()
        .required("O campo email é obrigatório!")
        .email("Informe um email válido!"),

      password: yup
      .string()
      .required("O campo senha e obrigatorio!")
      .min(6, "O campo senha deve ter no minimo 6 caracteres!"),

      situationId: yup
        .string()
        .required("O campo situationId é obrigatório!"),
    });

    await schema.validate(
      data,
      { abortEarly: false }
    );

    const existeEmail = await userRepository.findOne({
      where: {
        email: data.email,
        id: Not(id),
      },
    });

    if (existeEmail) {
      return res.status(400).json({
        messagem: "Já existe um email cadastrado com esse nome!",
      });
    }


    userRepository.merge(user, {
      name: data.name,
      email: data.email,
      password: data.password,
      situation: { id: Number(data.situationId) },
    });

    const update = await userRepository.save(user);

    return res.status(200).json({
      messagem: "Usuário atualizado com sucesso!",
      user: update,
    });
  } catch (error) {
   if(error instanceof yup.ValidationError){
               res.status(400).json({
               messagem: error.errors
           });
           return;
        }
    return res.status(500).json({
      messagem: "Algo deu errado no processamento!",
    });
  }
});

//deletar
router.delete("/usuario/:id",async(req:Request, res:Response)=>{

    try{
    const id = Number(req.params.id);
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({id});

    if(!user){
        return res.status(404).json({
            messagem: "Id do usuario não encontrado!"
        })
    }

    await userRepository.remove(user);

    res.status(200).json({
        messagem:  "Usuario removido com sucesso!"
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