import { BaseEntity } from "typeorm";
import { ProductCategory } from "./ProductCategory.js";
export declare class Product extends BaseEntity {
    id: number;
    name: string;
    productCategory: ProductCategory;
    createAt: Date;
    updateAt: Date;
}
//# sourceMappingURL=Product.d.ts.map