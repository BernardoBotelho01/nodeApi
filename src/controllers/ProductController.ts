import express from "express";
import type { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Product } from "../entity/Product.js";

const router = express.Router();

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

router.get("/produto",async(req:Request, res:Response)=>{

    try{
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.find();

    res.status(200).json(product);
    return
    }
    catch(error){
        res.status(404).json({
            messagem: "Error ao listar produtos!"
        });
        return
    }
});

export default router;
