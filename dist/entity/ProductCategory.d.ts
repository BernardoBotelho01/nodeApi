import { BaseEntity } from "typeorm";
import { Product } from "./Product.js";
export declare class ProductCategory extends BaseEntity {
    id: number;
    name: string;
    createAt: Date;
    updateAt: Date;
    products: Product[];
}
//# sourceMappingURL=ProductCategory.d.ts.map