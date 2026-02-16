import express from "express";
import type { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Product } from "../entity/Product.js";

const router = express.Router();
//cadastar
router.post("/produto", async (req: Request, res: Response) => {
  try {
    const { name, productCategoryId, productSituationId } = req.body;

    const productRepository = AppDataSource.getRepository(Product);

    const newProduct = productRepository.create({
      name,
      productCategory: { id: productCategoryId },
      productSituation: { id: productSituationId },
    });

    await productRepository.save(newProduct);

    res.status(201).json({
      messagem: "Produto cadastrado com sucesso!",
      product: newProduct,
    });
  } catch (error) {
    res.status(404).json({
      messagem: "Error ao cadastradar produto!",
      error: String(error),
    });
  }
});
//listar
router.get("/produto",async(req:Request, res:Response)=>{

    try{
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.find();

    res.status(200).json(product);
    return
    }
    catch(error){
        res.status(500).json({
            messagem: "Error ao listar produtos!"
        });
        return
    }
});

//listar por id
router.get("/produto/:id",async(req:Request, res:Response)=>{

    try{
    const id = Number(req.params.id);
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOneBy({id});

    if(!product){
        return res.status(404).json({
            messagem: "Id do produto não encontrado!"
        })
    }

    res.status(200).json(product);
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
router.put("/produto/:id",async(req:Request, res:Response)=>{

    try{
    const id = Number(req.params.id);
    const data = req.body;
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOneBy({id});

    if(!product){
        return res.status(404).json({
            messagem: "Id do produto não encontrado!"
        })
    }

    productRepository.merge(product, data);

    const update = await productRepository.save(product);
    
    res.status(200).json({
        messagem: "Produto atualizado com sucesso!",
        product: update
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
router.delete("/produto/:id",async(req:Request, res:Response)=>{

    try{
    const id = Number(req.params.id);
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOneBy({id});

    if(!product){
        return res.status(404).json({
            messagem: "Id do produto não encontrado!"
        })
    }

    await productRepository.remove(product);
    
    res.status(200).json({
        messagem: "Produto removido com sucesso!"
    });
    }
    catch(error){
        res.status(500).json({
            messagem: "Algo deu errado no processamento!"
        });
        return
    }
});


export default router;
