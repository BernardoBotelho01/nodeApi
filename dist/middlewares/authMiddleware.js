import jwt from "jsonwebtoken";
export default function verificarToken(req, res, next) {
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
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id };
        next();
    }
    catch {
        res.status(401).json({
            messagem: "Token inválido ou expirado!"
        });
    }
}
//# sourceMappingURL=authMiddleware.js.map