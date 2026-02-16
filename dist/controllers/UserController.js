import express from "express";
import { AppDataSource } from "../data-source.js";
import { User } from "../entity/User.js";
import { PaginationService } from "../services/PaginationService.js";
const router = express.Router();
// cadastrar
router.post("/usuario", async (req, res) => {
    try {
        const { name, email, situationId } = req.body;
        const userRepository = AppDataSource.getRepository(User);
        const newUser = userRepository.create({
            name,
            email,
            situation: { id: situationId },
        });
        await userRepository.save(newUser);
        res.status(201).json({
            messagem: "Usuario cadastrado com sucesso!",
            user: newUser,
        });
    }
    catch (error) {
        res.status(500).json({
            messagem: "Algo deu errado no processamento!"
        });
    }
});
//listar
router.get("/usuario", async (req, res) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.find();
        //paginação
        // Receber o numero da página e definir página 1 como padrão
        const page = Number(req.query.page) || 1;
        //Definir o limite de registro por páginas
        const limite = Number(req.query.limite) || 10;
        const result = await PaginationService.paginate(userRepository, page, limite, { id: "DESC" });
        res.status(200).json(result);
        return;
        //fim paginação
        res.status(200).json(user);
        return;
    }
    catch (error) {
        res.status(500).json({
            messagem: "Error ao listar usuarios!"
        });
        return;
    }
});
//listar por id
router.get("/usuario/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ id });
        if (!user) {
            return res.status(404).json({
                messagem: "Id do usuario não encontrado!"
            });
        }
        res.status(200).json(user);
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
router.put("/usuario/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const data = req.body;
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ id });
        if (!user) {
            return res.status(404).json({
                messagem: "Id do usuario não encontrado!"
            });
        }
        userRepository.merge(user, data);
        const update = await userRepository.save(user);
        res.status(200).json({
            messagem: "Usuario atualizado com sucesso!",
            user: update
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
router.delete("/usuario/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ id });
        if (!user) {
            return res.status(404).json({
                messagem: "Id do usuario não encontrado!"
            });
        }
        await userRepository.remove(user);
        res.status(200).json({
            messagem: "Usuario removido com sucesso!"
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
//# sourceMappingURL=UserController.js.map