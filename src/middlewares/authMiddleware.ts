import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: { id: number };
}

export default function verificarToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({
      messagem: "Token não informado!"
    });
    return;
  }

  const [bearer, token] = authHeader.split(" ");

  if (!token || bearer?.toLocaleLowerCase() !== "bearer") {
    res.status(401).json({
      messagem: "Token invalido!"
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {id: number}

    req.user = { id: decoded.id };

    next();
  } catch {
    res.status(401).json({
      messagem: "Token inválido ou expirado!"
    });
  }
}