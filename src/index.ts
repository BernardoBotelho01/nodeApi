
import express from "express";
import perfil from "./controllers/perfil.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();


app.use("/", perfil);


app.listen(process.env.PORT, () => {
  console.log(`Servidor iniciado na porta ${process.env.PORT}: http://localhost:${process.env.PORT}`);
});
