import { AppDataSource } from "../data-source.js";
import { User } from "../entity/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

export class AuthService {
    private userRepository = AppDataSource.getRepository(User);

    async login(email: string, password: string): Promise<{
        id: number;
        name: string;
        email: string;
        token: string;
    }> {
        const user = await this.userRepository.findOne({
            where: { email }
        });

        if (!user) {
            throw new Error("Usuario ou senha invalido!");
        }

        const passwordValido = await bcrypt.compare(password, user.password);

        if (!passwordValido) {
            throw new Error("Usuario ou senha invalido!");
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token
        };
    }
}