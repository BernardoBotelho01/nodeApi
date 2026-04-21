import { BaseEntity } from "typeorm";
import { Situation } from "./Situation.js";
export declare class User extends BaseEntity {
    id: number;
    name: string;
    email: string;
    password: string;
    situation: Situation;
    createAt: Date;
    updateAt: Date;
}
//# sourceMappingURL=User.d.ts.map