import { BaseEntity } from "typeorm";
import { Situation } from "./Situation.js";
export declare class User extends BaseEntity {
    id: number;
    name: string;
    email: string;
    password: string;
    recoverPassword: string | null;
    situation: Situation;
    createAt: Date;
    updateAt: Date;
    hashPassword(): Promise<void>;
    comparePassword(password: string): Promise<boolean>;
}
//# sourceMappingURL=User.d.ts.map