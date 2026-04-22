import type { NextFunction, Request, Response } from "express";
interface AuthRequest extends Request {
    user?: {
        id: number;
    };
}
export default function verificarToken(req: AuthRequest, res: Response, next: NextFunction): void;
export {};
//# sourceMappingURL=authMiddleware.d.ts.map