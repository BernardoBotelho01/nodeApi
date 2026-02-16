import express from "express";
import { AppDataSource } from "../data-source.js";
import { User } from "../entity/User.js";
const router = express.Router();
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
        res.status(404).json({
            messagem: "Error ao cadastradar usuario!"
        });
    }
});
export default router;
//# sourceMappingURL=UserController.js.map