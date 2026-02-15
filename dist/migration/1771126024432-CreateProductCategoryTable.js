import { Table, TableForeignKey } from "typeorm";
export class CreateProductCategoryTable1771126024432 {
    async up(queryRunner) {
        await queryRunner.createTable(new Table({
            name: "product_categories",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "createAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                },
                {
                    name: "updateAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                    onUpdate: "CURRENT_TIMESTAMP",
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("product_categories");
    }
}
//# sourceMappingURL=1771126024432-CreateProductCategoryTable.js.map