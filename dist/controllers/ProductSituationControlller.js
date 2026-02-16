import express from "express";
import { AppDataSource } from "../data-source.js";
import { ProductSituation } from "../entity/ProductSituation.js";
import { PaginationService } from "../services/PaginationService.js";
const router = express.Router();
//cadastar
router.post("/situacaoproduto", async (req, res) => {
    try {
        var data = req.body;
        const productSituationRepository = AppDataSource.getRepository(ProductSituation);
        const newProductSituation = productSituationRepository.create(data);
        await productSituationRepository.save(newProductSituation);
        res.status(201).json({
            messagem: "Situação do produto cadastrada com sucesso!",
            productSituation: newProductSituation,
        });
    }
    catch (error) {
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
        const data = req.body;
        const productSituationRepository = AppDataSource.getRepository(ProductSituation);
        const productSituation = await productSituationRepository.findOneBy({ id });
        if (!productSituation) {
            return res.status(404).json({
                messagem: "Id da situaçao do produto não encontrado!"
            });
        }
        productSituationRepository.merge(productSituation, data);
        const update = await productSituationRepository.save(productSituation);
        res.status(200).json({
            messagem: "Situação do produto atualizada com sucesso!",
            productSituation: update
        });
    }
    catch (error) {
        res.status(500).json({
            messagem: "Algo deu errado no processamento!"
        });
        return;
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