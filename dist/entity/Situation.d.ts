import { BaseEntity } from "typeorm";
import { User } from "./User.js";
export declare class Situation extends BaseEntity {
    id: number;
    nameSituation: string;
    createAt: Date;
    updateAt: Date;
    users: User[];
}
//# sourceMappingURL=Situation.d.ts.map