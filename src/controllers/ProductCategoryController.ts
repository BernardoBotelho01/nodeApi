import express from "express";
import type{Request, Response} from "express";
import { AppDataSource } from "../data-source.js";
import {ProductCategory} from "../entity/ProductCategory.js"

const router = express.Router();

//cadastrar
router.post("/categoriaproduto",async(req:Request, res:Response)=>{
    try{

        var data = req.body;
        const productCategoryRepository = AppDataSource.getRepository(ProductCategory);
        const newProductCategory = productCategoryRepository.create(data);

        await productCategoryRepository.save(newProductCategory);

        res.status(201).json({
            messagem: "Categoria do produto cadastrada com sucesso!",
            productCategory: newProductCategory,
        });

    }
    catch(error)
    {
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
            messagem: "Algo deu errado no processamento!"
        });
        return
    }
});

//atualizar
router.put("/categoriaproduto/:id",async(req:Request, res:Response)=>{

    try{
    const id = Number(req.params.id);
    const data = req.body;
    const productCategoryRepository = AppDataSource.getRepository(ProductCategory);
    const productCategory = await productCategoryRepository.findOneBy({id});

    if(!productCategory){
        return res.status(404).json({
            messagem: "Id da categoria do produto não encontrada!"
        })
    }

    productCategoryRepository.merge(productCategory, data);

    const update = await productCategoryRepository.save(productCategory);

    res.status(200).json({
        messagem: "Categoria do produto atualizada com sucesso!",
        productCategory: update
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
router.delete("/categoriaproduto/:id",async(req:Request, res:Response)=>{

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
            messagem: "Algo deu errado no processamento!"
        });
        return
    }
});

export default router