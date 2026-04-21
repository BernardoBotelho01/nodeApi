import { TableColumn } from "typeorm";
export class AddPriceToProducts1776795686219 {
    async up(queryRunner) {
        await queryRunner.addColumn('products', new TableColumn({
            name: "price",
            type: "decimal",
            precision: 10,
            scale: 2,
            isNullable: false
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn("products", "price");
    }
}
//# sourceMappingURL=1776795686219-AddPriceToProducts.js.map