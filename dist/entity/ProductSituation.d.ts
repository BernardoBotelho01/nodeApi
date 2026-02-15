import { BaseEntity } from "typeorm";
import { Product } from "./Product.js";
export declare class ProductSituation extends BaseEntity {
    id: number;
    name: string;
    createAt: Date;
    updateAt: Date;
    products: Product[];
}
//# sourceMappingURL=ProductSituation.d.ts.map