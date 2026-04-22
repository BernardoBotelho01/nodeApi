import express from "express";
import { AuthService } from "../services/AuthService.js";
import { AppDataSource } from "../data-source.js";
import { User } from "../entity/User.js";
import * as yup from "yup";
import crypto from "node:crypto";
import nodemailer from "nodemailer";
import verificarToken from "../middlewares/authMiddleware.js";
const router = express.Router();
router.post("/autenticacao", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                messagem: "Email e senha são obrigatorios!",
            });
        }
        const authService = new AuthService();
        const userData = await authService.login(email, password);
        return res.status(200).json({
            messagem: "Login realizado com sucesso!",
            user: userData,
        });
    }
    catch (error) {
        return res.status(401).json({
            messagem: error.message || "Erro ao realizar login!",
        });
    }
});
//cadastro publico
router.post("/usuario", verificarToken, async (req, res) => {
    try {
        const data = req.body;
        const schema = yup.object().shape({
            name: yup
                .string()
                .required("O campo nome é obrigatório!")
                .min(3, "O nome deve ter no mínimo 3 caracteres!"),
            email: yup
                .string()
                .required("O campo email é obrigatório!")
                .email("Informe um email válido!"),
            password: yup
                .string()
                .required("O campo senha e obrigatorio!")
                .min(6, "O campo senha deve ter no minimo 6 caracteres!"),
            situationId: yup
                .string()
                .required("O campo situationId é obrigatório!"),
        });
        await schema.validate(data, { abortEarly: false });
        const userRepository = AppDataSource.getRepository(User);
        const existeEmail = await userRepository.findOne({
            where: { email: data.email }
        });
        if (existeEmail) {
            res.status(400).json({
                messagem: "Já existe um email cadastrado com esse nome!"
            });
            return;
        }
        //senha criptografada
        //data.password = await bcrypt.hash(data.password, 10);
        const newUser = userRepository.create({
            name: data.name,
            email: data.email,
            password: data.password,
            situation: { id: Number(data.situationId) },
        });
        await userRepository.save(newUser);
        res.status(201).json({
            messagem: "Usuario cadastrado com sucesso!",
            user: newUser,
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
            messagem: "Algo deu errado no processamento!"
        });
    }
});
router.get("/validar-token", verificarToken, async (req, res) => {
    return res.status(200).json({
        messagem: "Token valido!",
        userId: req.user.id,
    });
});
router.post("/recuperar-senha", async (req, res) => {
    try {
        const data = req.body;
        const schema = yup.object().shape({
            urlRecoverPassword: yup
                .string()
                .transform((value) => value?.trim() === "" ? undefined : value)
                .required("O campo Url é obrigatório!")
                .oneOf([process.env.APP_URL], "A URL de recuperação é inválida!"),
            email: yup
                .string()
                .email("Email inválido!")
                .required("O campo email é obrigatório!"),
        });
        await schema.validate(data, { abortEarly: false });
        const userRepository = AppDataSource.getRepository(User);
        const existeUser = await userRepository.findOneBy({
            email: data.email,
        });
        if (!existeUser) {
            return res.status(404).json({
                messagem: "Usuário não encontrado!",
            });
        }
        existeUser.recoverPassword = crypto.randomBytes(32).toString("hex");
        await userRepository.save(existeUser);
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        const linkRecoverPassword = `${data.urlRecoverPassword}?email=${data.email}&key=${existeUser.recoverPassword}`;
        const message = {
            from: process.env.EMAIL_FROM,
            to: data.email,
            subject: "Recuperar senha",
            text: `Prezado(a) ${existeUser.name}

Informamos que sua solicitação de alteração de senha foi recebida com sucesso.

Clique ou copie o link para criar uma nova senha em nosso sistema:
${linkRecoverPassword}

Esta mensagem foi enviada pela empresa NodeApi.`,
            html: `Prezado(a) ${existeUser.name}<br><br>
Informamos que sua solicitação de alteração de senha foi recebida com sucesso.<br><br>
Clique no link abaixo para criar uma nova senha em nosso sistema:<br><br>
<a href="${linkRecoverPassword}">${linkRecoverPassword}</a><br><br>
Esta mensagem foi enviada pela empresa NodeApi.`,
        };
        const info = await transporter.sendMail(message);
        return res.status(200).json({
            messagem: "Email enviado, verifique sua caixa de entrada!",
            urlRecoverPassword: linkRecoverPassword,
        });
    }
    catch (error) {
        if (error instanceof yup.ValidationError) {
            return res.status(400).json({
                messagem: error.errors,
            });
        }
        return res.status(500).json({
            messagem: "Algo deu errado no processamento!",
        });
    }
});
router.post("/validar-senha", async (req, res) => {
    try {
        const data = req.body;
        const schema = yup.object().shape({
            recoverPassword: yup
                .string()
                .required("A chave e obrigatório!"),
            email: yup
                .string()
                .email("Email inválido!")
                .required("O campo email é obrigatório!"),
        });
        await schema.validate(data, { abortEarly: false });
        const userRepository = AppDataSource.getRepository(User);
        const existeUser = await userRepository.findOneBy({
            email: data.email, recoverPassword: data.recoverPassword
        });
        if (!existeUser) {
            return res.status(404).json({
                messagem: "A Chave não e valida!",
            });
        }
        return res.status(200).json({
            messagem: "A chave e valida!"
        });
    }
    catch (error) {
        if (error instanceof yup.ValidationError) {
            return res.status(400).json({
                messagem: error.errors,
            });
        }
        return res.status(500).json({
            messagem: "A chave recuperar senha e invalida!",
        });
    }
});
router.put("/atualizar-senha", async (req, res) => {
    try {
        const data = req.body;
        const schema = yup.object().shape({
            recoverPassword: yup
                .string()
                .required("A chave recuperar senha e invalida!"),
            email: yup
                .string()
                .email("Email inválido!")
                .required("O campo email é obrigatório!"),
            password: yup
                .string()
                .required("O campo senha e obrigatorio!")
                .min(6, "O campo senha deve ter no minimo 6 caracteres!"),
        });
        await schema.validate(data, { abortEarly: false });
        const userRepository = AppDataSource.getRepository(User);
        const existeUser = await userRepository.findOneBy({
            email: data.email, recoverPassword: data.recoverPassword
        });
        if (!existeUser) {
            return res.status(404).json({
                messagem: "A Chave não e valida!",
            });
        }
        data.recoverPassword = null;
        userRepository.merge(existeUser, data);
        await userRepository.save(existeUser);
        return res.status(200).json({
            messagem: "Senha atualizada com sucesso! recuperar senha e valida."
        });
    }
    catch (error) {
        if (error instanceof yup.ValidationError) {
            return res.status(400).json({
                messagem: error.errors,
            });
        }
        return res.status(500).json({
            messagem: "A chave recuperar senha e invalida!",
        });
    }
});
export default router;
//# sourceMappingURL=AuthController.js.map