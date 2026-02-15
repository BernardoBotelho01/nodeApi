import { Table, TableForeignKey } from "typeorm";
export class CreateProductTable1771126043844 {
    async up(queryRunner) {
        await queryRunner.createTable(new Table({
            name: "products",
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
                    name: "productCategoryId",
                    type: "int",
                },
                {
                    name: "productSituationId",
                    type: "int",
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
        await queryRunner.createForeignKey("products", new TableForeignKey({
            columnNames: ["productCategoryId"],
            referencedTableName: "product_categories",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
        }));
        await queryRunner.createForeignKey("products", new TableForeignKey({
            columnNames: ["productSituationId"],
            referencedTableName: "product_situations",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable("products");
        if (table) {
            const fkCategory = table.foreignKeys.find((fk) => fk.columnNames.includes("productCategoryId"));
            if (fkCategory)
                await queryRunner.dropForeignKey("products", fkCategory);
            const fkSituation = table.foreignKeys.find((fk) => fk.columnNames.includes("productSituationId"));
            if (fkSituation)
                await queryRunner.dropForeignKey("products", fkSituation);
        }
        await queryRunner.dropTable("products");
    }
}
//# sourceMappingURL=1771126043844-CreateProductTable.js.map