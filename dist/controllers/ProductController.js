import express from "express";
import { AppDataSource } from "../data-source.js";
import { Product } from "../entity/Product.js";
import { PaginationService } from "../services/PaginationService.js";
import * as yup from 'yup';
import { Not } from "typeorm";
import strict from "node:assert/strict";
import slugify from "slugify";
const router = express.Router();
//cadastar
router.post("/produto", async (req, res) => {
    try {
        const data = req.body;
        const schema = yup.object().shape({
            name: yup
                .string()
                .required("O campo nome é obrigatório!")
                .min(3, "O nome deve ter no mínimo 3 caracteres!"),
            slug: yup
                .string()
                .required("O campo slug é obrigatório!")
                .min(3, "O campo slug deve ter no mínimo 3 caracteres!")
                .max(255, "O campo slug deve ter no maximo 255 caracteres!"),
            description: yup
                .string()
                .required("O campo descrição é obrigatório!")
                .min(3, "O campo descrição deve ter no mínimo 3 caracteres!")
                .max(255, "O campo descrição deve ter no maximo 255 caracteres!"),
            price: yup
                .number()
                .typeError("O campo preço deve ser numérico!")
                .required("O campo preço é obrigatório!")
                .positive("O preço deve ser um valor positivo!")
                .test("is-decimal", "O preço deve ter no máximo duas casas decimais!", (value) => value === undefined || Number(value.toFixed(2)) === value),
            productCategoryId: yup
                .number()
                .typeError("O campo categoria deve ser numérico!")
                .required("O campo categoria é obrigatório!")
                .integer("O campo categoria deve ser um numero inteiro!")
                .positive("O campo categoria deve ser um valor positivo!"),
            productSituationId: yup
                .number()
                .typeError("O campo situação deve ser numérico!")
                .required("O campo situação é obrigatório!")
                .integer("O campo situação deve ser um numero inteiro!")
                .positive("O campo situação deve ser um valor positivo!"),
        });
        await schema.validate(data, { abortEarly: false });
        data.slug = slugify(data.slug, { lower: true, strict: true });
        const productRepository = AppDataSource.getRepository(Product);
        const existeName = await productRepository.findOne({
            where: { name: data.name }
        });
        if (existeName) {
            res.status(400).json({
                messagem: "Já existe um produto cadastrado com esse nome!"
            });
            return;
        }
        const existeSlug = await productRepository.findOne({
            where: { slug: data.slug }
        });
        if (existeSlug) {
            res.status(400).json({
                messagem: "Já existe um produto cadastrado com esse slug!"
            });
            return;
        }
        const newProduct = productRepository.create({
            name: data.name,
            slug: data.slug,
            description: data.description,
            price: data.price,
            productCategory: { id: Number(data.productCategoryId) },
            productSituation: { id: Number(data.productSituationId) },
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
        const data = req.body;
        const schema = yup.object().shape({
            name: yup
                .string()
                .required("O campo nome é obrigatório!")
                .min(3, "O nome deve ter no mínimo 3 caracteres!"),
            slug: yup
                .string()
                .required("O campo slug é obrigatório!")
                .min(3, "O campo slug deve ter no mínimo 3 caracteres!")
                .max(255, "O campo slug deve ter no maximo 255 caracteres!"),
            description: yup
                .string()
                .required("O campo descrição é obrigatório!")
                .min(3, "O campo descrição deve ter no mínimo 3 caracteres!"),
            price: yup
                .number()
                .typeError("O campo preço deve ser numérico!")
                .required("O campo preço é obrigatório!")
                .positive("O preço deve ser um valor positivo!")
                .test("is-decimal", "O preço deve ter no máximo duas casas decimais!", (value) => value === undefined || Number(value.toFixed(2)) === value),
            productCategoryId: yup
                .number()
                .typeError("O campo categoria deve ser numérico!")
                .required("O campo categoria é obrigatório!")
                .integer("O campo categoria deve ser um numero inteiro!")
                .positive("O campo categoria deve ser um valor positivo!"),
            productSituationId: yup
                .number()
                .typeError("O campo situação deve ser numérico!")
                .required("O campo situação é obrigatório!")
                .integer("O campo situação deve ser um numero inteiro!")
                .positive("O campo situação deve ser um valor positivo!"),
        });
        await schema.validate(data, { abortEarly: false });
        data.slug = slugify(data.slug, { lower: true, strict: true });
        const existeName = await productRepository.findOne({
            where: {
                name: data.name,
                id: Not(id),
            },
        });
        if (existeName) {
            return res.status(400).json({
                messagem: "Já existe um produto cadastrado com esse nome!",
            });
        }
        const existeSlug = await productRepository.findOne({
            where: { slug: data.slug }
        });
        if (existeSlug) {
            res.status(400).json({
                messagem: "Já existe um produto cadastrado com esse slug!"
            });
            return;
        }
        productRepository.merge(product, {
            name: data.name,
            slug: data.slug,
            description: data.description,
            price: data.price,
            productCategory: { id: Number(data.productCategoryId) },
            productSituation: { id: Number(data.productSituationId) },
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