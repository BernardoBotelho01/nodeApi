import express from "express";
import { AppDataSource } from "../data-source.js";
import { Situation } from "../entity/Situation.js";
const router = express.Router();
router.post("/situacao", async (req, res) => {
    try {
        var data = req.body;
        const situationRepository = AppDataSource.getRepository(Situation);
        const newSituation = situationRepository.create(data);
        await situationRepository.save(newSituation);
        res.status(201).json({
            messagem: "Situação cadastrada com sucesso!",
            situation: newSituation,
        });
    }
    catch (error) {
        res.status(404).json({
            messagem: "Error ao cadastradar situação!"
        });
    }
});
router.get("/situacao", async (req, res) => {
    try {
        const situationRepository = AppDataSource.getRepository(Situation);
        const situations = await situationRepository.find();
        res.status(200).json(situations);
        return;
    }
    catch (error) {
        res.status(404).json({
            messagem: "Error ao listar situações!"
        });
        return;
    }
});
export default router;
//# sourceMappingURL=SituationController.js.map