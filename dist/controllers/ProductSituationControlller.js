import express from "express";
import { AppDataSource } from "../data-source.js";
import { ProductSituation } from "../entity/ProductSituation.js";
import { PaginationService } from "../services/PaginationService.js";
import * as yup from 'yup';
const router = express.Router();
//cadastar
router.post("/situacaoproduto", async (req, res) => {
    try {
        const data = req.body;
        const schema = yup.object().shape({
            name: yup.string()
                .required("O campo nome e obrigatorio!")
                .min(5, "Campo nome deve ter no minimo 5 caracteres, ex: ATIVO, INATIVO ETC...!")
        });
        await schema.validate(data, { abortEarly: false });
        const productSituationRepository = AppDataSource.getRepository(ProductSituation);
        const newProductSituation = productSituationRepository.create(data);
        await productSituationRepository.save(newProductSituation);
        res.status(201).json({
            messagem: "Situação do produto cadastrada com sucesso!",
            productSituation: newProductSituation,
        });
    }
    catch (error) {
        if (error instanceof yup.ValidationError) {
            res.status(400).json({
                messagem: error.errors
            });
            return;
        }
        res.status(500).json({
            messagem: "Error ao cadastradar situação do produto!"
        });
    }
});
//listar
router.get("/situacaoproduto", async (req, res) => {
    try {
        const productSituationRepository = AppDataSource.getRepository(ProductSituation);
        const productSituation = await productSituationRepository.find();
        //paginação
        // Receber o numero da página e definir página 1 como padrão
        const page = Number(req.query.page) || 1;
        //Definir o limite de registro por páginas
        const limite = Number(req.query.limite) || 10;
        const result = await PaginationService.paginate(productSituationRepository, page, limite, { id: "DESC" });
        res.status(200).json(result);
        return;
        //fim paginação
        res.status(200).json(productSituation);
        return;
    }
    catch (error) {
        res.status(500).json({
            messagem: "Error ao listar situação de produtos!"
        });
        return;
    }
});
//listar por id
router.get("/situacaoproduto/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const productSituationRepository = AppDataSource.getRepository(ProductSituation);
        const productSituation = await productSituationRepository.findOneBy({ id });
        if (!productSituation) {
            return res.status(404).json({
                messagem: "Id da situaçao do produto não encontrado!"
            });
        }
        res.status(200).json(productSituation);
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
router.put("/situacaoproduto/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const productSituationRepository = AppDataSource.getRepository(ProductSituation);
        const productSituation = await productSituationRepository.findOneBy({ id });
        if (!productSituation) {
            return res.status(404).json({
                messagem: "Id da situação do produto não encontrado!",
            });
        }
        const { name } = req.body;
        const schema = yup.object({
            name: yup
                .string()
                .required("O campo nome é obrigatório!")
                .min(5, "Campo nome deve ter no mínimo 5 caracteres, ex: ATIVO, INATIVO etc...!"),
        });
        await schema.validate({ name }, { abortEarly: false });
        productSituationRepository.merge(productSituation, {
            name,
        });
        const update = await productSituationRepository.save(productSituation);
        return res.status(200).json({
            messagem: "Situação do produto atualizada com sucesso!",
            productSituation: update,
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
router.delete("/situacaoproduto/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const productSituationRepository = AppDataSource.getRepository(ProductSituation);
        const productSituation = await productSituationRepository.findOneBy({ id });
        if (!productSituation) {
            return res.status(404).json({
                messagem: "Id da situaçao do produto não encontrado!"
            });
        }
        await productSituationRepository.remove(productSituation);
        res.status(200).json({
            messagem: "Situação do produto removida com sucesso!"
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
//# sourceMappingURL=ProductSituationControlller.js.map