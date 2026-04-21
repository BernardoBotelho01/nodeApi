import { TableColumn } from "typeorm";
export class AddSlugToProducts1776776180148 {
    async up(queryRunner) {
        await queryRunner.addColumn('products', new TableColumn({
            name: "slug",
            type: "varchar",
            length: "255",
            isUnique: true,
            isNullable: false,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn("products", "slug");
    }
}
//# sourceMappingURL=1776776180148-AddSlugToProducts.js.map