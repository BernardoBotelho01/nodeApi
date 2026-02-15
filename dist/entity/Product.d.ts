import { BaseEntity } from "typeorm";
import { ProductCategory } from "./ProductCategory.js";
import { ProductSituation } from "./ProductSituation.js";
export declare class Product extends BaseEntity {
    id: number;
    name: string;
    productCategory: ProductCategory;
    productSituation: ProductSituation;
    createAt: Date;
    updateAt: Date;
}
//# sourceMappingURL=Product.d.ts.map