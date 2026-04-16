import express from "express";
import { AppDataSource } from "../data-source.js";
import { Product } from "../entity/Product.js";
import { PaginationService } from "../services/PaginationService.js";
import * as yup from 'yup';
const router = express.Router();
//cadastar
router.post("/produto", async (req, res) => {
    try {
        const { name, productCategoryId, productSituationId } = req.body;
        const schema = yup.object({
            name: yup
                .string()
                .required("O campo nome é obrigatório!")
                .min(3, "O nome deve ter no mínimo 3 caracteres!"),
            productCategoryId: yup
                .string()
                .required("O campo productCategoryId é obrigatório!"),
            productSituationId: yup
                .string()
                .required("O campo productSituationId é obrigatório!"),
        });
        await schema.validate({ name, productCategoryId, productSituationId }, { abortEarly: false });
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
        if (error instanceof yup.ValidationError) {
            res.status(400).json({
                messagem: error.errors
            });
            return;
        }
        res.status(404).json({
            messagem: "Error ao cadastradar produto!",
            error: String(error),
        });
    }
});
//listar
router.get("/produto", async (req, res) => {
    try {
        const productRepository = AppDataSource.getRepository(Product);
        const product = await productRepository.find();
        //paginação
        // Receber o numero da página e definir página 1 como padrão
        const page = Number(req.query.page) || 1;
        //Definir o limite de registro por páginas
        const limite = Number(req.query.limite) || 10;
        const result = await PaginationService.paginate(productRepository, page, limite, { id: "DESC" });
        res.status(200).json(result);
        return;
        //fim paginação
        res.status(200).json(product);
        return;
    }
    catch (error) {
        res.status(500).json({
            messagem: "Error ao listar produtos!"
        });
        return;
    }
});
//listar por id
router.get("/produto/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const productRepository = AppDataSource.getRepository(Product);
        const product = await productRepository.findOneBy({ id });
        if (!product) {
            return res.status(404).json({
                messagem: "Id do produto não encontrado!"
            });
        }
        res.status(200).json(product);
        return;
    }
    catch (error) {
        res.status(500).json({
            messagem: "Algo deu errado no processamento!"
        });
        return;
    }
});
//atualizar
router.put("/produto/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const productRepository = AppDataSource.getRepository(Product);
        const product = await productRepository.findOneBy({ id });
        if (!product) {
            return res.status(404).json({
                messagem: "Id do produto não encontrado!",
            });
        }
        const { name, productCategoryId, productSituationId } = req.body;
        const schema = yup.object({
            name: yup
                .string()
                .required("O campo nome é obrigatório!")
                .min(3, "O nome deve ter no mínimo 3 caracteres!"),
            productCategoryId: yup
                .string()
                .required("O campo productCategoryId é obrigatório!"),
            productSituationId: yup
                .string()
                .required("O campo productSituationId é obrigatório!"),
        });
        await schema.validate({ name, productCategoryId, productSituationId }, { abortEarly: false });
        productRepository.merge(product, {
            name,
            productCategory: { id: Number(productCategoryId) },
            productSituation: { id: Number(productSituationId) },
        });
        const update = await productRepository.save(product);
        return res.status(200).json({
            messagem: "Produto atualizado com sucesso!",
            product: update,
        });
    }
    catch (error) {
        if (error instanceof yup.ValidationError) {
            res.status(404).json({
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
router.delete("/produto/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const productRepository = AppDataSource.getRepository(Product);
        const product = await productRepository.findOneBy({ id });
        if (!product) {
            return res.status(404).json({
                messagem: "Id do produto não encontrado!"
            });
        }
        await productRepository.remove(product);
        res.status(200).json({
            messagem: "Produto removido com sucesso!"
        });
    }
    catch (error) {
        res.status(500).json({
            messagem: "Algo deu errado no processamento!"
        });
        return;
    }
});
export default router;
//# sourceMappingURL=ProductController.js.map