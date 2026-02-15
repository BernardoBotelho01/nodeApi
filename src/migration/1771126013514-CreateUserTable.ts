import { Table, TableForeignKey } from "typeorm";
import type { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1771126013514 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
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

                await queryRunner.createForeignKey(
                    "users",
                    new TableForeignKey({
                        columnNames: ["situationId"],
                        referencedTableName: "situations",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE"
                    })
                )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("users");
        const foreinkey = table?.foreignKeys.find((fk)=>fk.columnNames.includes("situations"));

        if(foreinkey){
            await queryRunner.dropForeignKey("users", foreinkey)
        }
        await queryRunner.dropTable("users");
    }

}
