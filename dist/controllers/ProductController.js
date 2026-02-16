import express from "express";
import { AppDataSource } from "../data-source.js";
import { Product } from "../entity/Product.js";
const router = express.Router();
router.post("/produto", async (req, res) => {
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
    }
    catch (error) {
        res.status(404).json({
            messagem: "Error ao cadastradar produto!",
            error: String(error),
        });
    }
});
export default router;
//# sourceMappingURL=ProductController.js.map