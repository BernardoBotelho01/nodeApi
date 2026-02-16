import { AppDataSource } from "./data-source.js";
import AuthCotroller from "./controllers/AuthController.js";
import SituationController from "./controllers/SituationController.js";
import UserController from "./controllers/UserController.js";
import ProductCategoryController from "./controllers/ProductCategoryController.js";
import ProductSituationController from "./controllers/ProductSituationControlller.js";
import ProductController from "./controllers/ProductController.js";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
await AppDataSource.initialize();
app.use("/", AuthCotroller);
app.use("/", SituationController);
app.use("/", UserController);
app.use("/", ProductCategoryController);
app.use("/", ProductSituationController);
app.use("/", ProductController);
app.listen(process.env.PORT, () => {
    console.log(`Servidor iniciado na porta ${process.env.PORT}: http://localhost:${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map