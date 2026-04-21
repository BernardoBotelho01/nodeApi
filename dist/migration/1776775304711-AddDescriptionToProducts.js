import { TableColumn } from "typeorm";
export class AddDescriptionToProducts1776775304711 {
    async up(queryRunner) {
        await queryRunner.addColumn('products', new TableColumn({
            name: "description",
            type: "text",
            isNullable: false,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn("products", "description");
    }
}
//# sourceMappingURL=1776775304711-AddDescriptionToProducts.js.map