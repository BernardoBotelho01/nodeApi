import express from "express";
import type{Request, Response} from "express";
import { AppDataSource } from "../data-source.js";
import {ProductCategory} from "../entity/ProductCategory.js"
import { PaginationService } from "../services/PaginationService.js";
import * as yup from 'yup';
import { Not } from "typeorm";
import  verificarToken  from "../middlewares/authMiddleware.js";

const router = express.Router();

//cadastrar
router.post("/categoriaproduto",async(req:Request, res:Response)=>{
    try{

        var data = req.body;

        const schema = yup.object().shape({
                    name: yup.string()
                    .required("O campo nome e obrigatorio!")
                    .min(5, "Campo nome deve ter no minimo 5 caracteres, ex: ALIMENTOS, ROUPAS ETC...!")
                });
            await schema.validate(data, {abortEarly: false});

        const productCategoryRepository = AppDataSource.getRepository(ProductCategory);

        const existeSituation = await productCategoryRepository.findOne({
            where: {name: data.name}
        });

        if(existeSituation){
           res.status(400).json({
            messagem: "Já existe uma categoria de produto cadastrada com esse nome!"
           });
           return;
        }

        const newProductCategory = productCategoryRepository.create(data);

        await productCategoryRepository.save(newProductCategory);

        res.status(201).json({
            messagem: "Categoria do produto cadastrada com sucesso!",
            productCategory: newProductCategory,
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
            messagem: "Error ao cadastradar categoria do produto!"
        });
    }
});
//listar
router.get("/categoriaproduto",async(req:Request, res:Response)=>{

    try{
    const productCategoryRepository = AppDataSource.getRepository(ProductCategory);
    const productCategory = await productCategoryRepository.find();

    //paginação

    // Receber o numero da página e definir página 1 como padrão
        const page = Number(req.query.page) || 1;
    //Definir o limite de registro por páginas
        const limite = Number(req.query.limite) || 10;
    
        const result = await PaginationService.paginate(productCategoryRepository, page, limite, {id: "DESC"});
    
        res.status(200).json(result);
        return
    //fim paginação

    res.status(200).json(productCategory);
    return
    }
    catch(error){
        res.status(500).json({
            messagem: "Error ao listar categorias de produtos!"
        });
        return
    }
});
//listar por id
router.get("/categoriaproduto/:id",async(req:Request, res:Response)=>{

    try{
    const id = Number(req.params.id);
    const productCategoryRepository = AppDataSource.getRepository(ProductCategory);
    const productCategory = await productCategoryRepository.findOneBy({id});

    if(!productCategory){
        return res.status(404).json({
            messagem: "Id da categoria do produto não encontrada!"
        })
    }

    res.status(200).json(productCategory);
    return
    }
    catch(error){
        res.status(500).json({
            messagem: "Erro ao buscar a categoria do produto pelo ID informado!"
        });
        return
    }
});

//atualizar
router.put("/categoriaproduto/:id",verificarToken, async(req:Request, res:Response)=>{

    try{
    const id = Number(req.params.id);
    const productCategoryRepository = AppDataSource.getRepository(ProductCategory);
    const productCategory = await productCategoryRepository.findOneBy({id});

    if(!productCategory){
        return res.status(404).json({
            messagem: "Id da categoria do produto não encontrada!"
        })
    }

    const { name } = req.body;
    
        const schema = yup.object().shape({
          name: yup
            .string()
            .required("O campo nome é obrigatório!")
            .min(5, "Campo nome deve ter no mínimo 5 caracteres, ex: Roupas, Eletronicos etc...!"),
        });

    await schema.validate(
      { name },
      { abortEarly: false }
    );

    const existeSituation = await productCategoryRepository.findOne({
      where: {
        name,
        id: Not(id),
      },
    });

    if (existeSituation) {
      return res.status(400).json({
        messagem: "Já existe uma categoria de produto cadastrada com esse nome!",
      });
    }

    productCategoryRepository.merge(productCategory, {
      name,
    });

    const update = await productCategoryRepository.save(productCategory);

    res.status(200).json({
        messagem: "Categoria do produto atualizada com sucesso!",
        productCategory: update
    });
    }
    catch(error){

        if(error instanceof yup.ValidationError){
                       res.status(400).json({
                       messagem: error.errors
                   });
                   return;
                }
        res.status(500).json({
            messagem: "Erro ao atualizar a categoria do produto!"
        });
        return
    }
});

//deletar
router.delete("/categoriaproduto/:id",verificarToken, async(req:Request, res:Response)=>{

    try{
    const id = Number(req.params.id);
    const productCategoryRepository = AppDataSource.getRepository(ProductCategory);
    const productCategory = await productCategoryRepository.findOneBy({id});

    if(!productCategory){
        return res.status(404).json({
            messagem: "Id da categoria do produto não encontrada!"
        })
    }

    await productCategoryRepository.merge(productCategory);

    res.status(200).json({
        messagem: "Categoria do produto removida com sucesso!"
    });
    }
    catch(error){
        res.status(500).json({
            messagem: "Erro ao remover a categoria do produto!"
        });
        return
    }
});

export default router