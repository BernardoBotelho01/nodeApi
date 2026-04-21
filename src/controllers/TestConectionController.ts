import express from "express";
import type{Request, Response} from "express";


const router = express.Router();


router.get("/teste-conexao",(req:Request, res:Response)=>{
    res.status(200).json({messagem: "Conexão com API realizada com sucesso..."});
});

export default router