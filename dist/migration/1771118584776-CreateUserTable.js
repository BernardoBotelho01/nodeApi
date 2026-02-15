import { Table, TableForeignKey } from "typeorm";
export class CreateUserTable1771109200306 {
    async up(queryRunner) {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "name",
                    type: "varchar"
                },
                {
                    name: "email",
                    type: "varchar",
                    isUnique: true
                },
                {
                    name: "situationId",
                    type: "int",
                },
                {
                    name: "createAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: "updateAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                    onUpdate: "CURRENT_TIMESTAMP"
                }
            ]
        }));
        await queryRunner.createForeignKey("users", new TableForeignKey({
            columnNames: ["situationId"],
            referencedTableName: "situations",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE"
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable("users");
        const foreinkey = table?.foreignKeys.find((fk) => fk.columnNames.includes("situations"));
        if (foreinkey) {
            await queryRunner.dropForeignKey("users", foreinkey);
        }
        await queryRunner.dropTable("users");
    }
}
//# sourceMappingURL=1771118584776-CreateUserTable.js.map