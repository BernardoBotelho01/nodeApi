import express from "express";
import type{Request, Response} from "express";
import { AppDataSource } from "../data-source.js";
import { error } from "node:console";

const router = express.Router();

AppDataSource.initialize().then(()=>{
    console.log("Conexão  realizada com sucesso")
}).catch((error)=>{
    console.log("Conexão falhou...", error)
})

router.get("/",(req:Request, res:Response)=>{
    res.send("Bem vindo  kkkkkk")
})

export default router