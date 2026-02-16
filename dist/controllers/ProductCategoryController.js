import express from "express";
import { AppDataSource } from "../data-source.js";
import { ProductCategory } from "../entity/ProductCategory.js";
const router = express.Router();
router.post("/categoriaproduto", async (req, res) => {
    try {
        var data = req.body;
        const productCategoryRepository = AppDataSource.getRepository(ProductCategory);
        const newProductCategory = productCategoryRepository.create(data);
        await productCategoryRepository.save(newProductCategory);
        res.status(201).json({
            messagem: "Categoria do produto cadastrada com sucesso!",
            productCategory: newProductCategory,
        });
    }
    catch (error) {
        res.status(404).json({
            messagem: "Error ao cadastradar categoria do produto!"
        });
    }
});
export default router;
//# sourceMappingURL=ProductCategoryController.js.map