import { BaseEntity } from "typeorm";
import { ProductCategory } from "./ProductCategory.js";
import { ProductSituation } from "./ProductSituation.js";
export declare class Product extends BaseEntity {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    productCategory: ProductCategory;
    productSituation: ProductSituation;
    createAt: Date;
    updateAt: Date;
}
//# sourceMappingURL=Product.d.ts.map