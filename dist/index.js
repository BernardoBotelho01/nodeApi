import { AppDataSource } from "./data-source.js";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
await AppDataSource.initialize();
import AuthCotroller from "./controllers/AuthController.js";
import SituationController from "./controllers/SituationController.js";
app.use("/", AuthCotroller);
app.use("/", SituationController);
app.listen(process.env.PORT, () => {
    console.log(`Servidor iniciado na porta ${process.env.PORT}: http://localhost:${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map