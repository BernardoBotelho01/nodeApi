import { TableColumn } from "typeorm";
import type{ MigrationInterface, QueryRunner } from "typeorm";

export class AddRecoverPasswordToUsers1776810773581 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn({
                            name:"recoverPassword",
                            type:"varchar",
                            length:"255",
                            isUnique: true,
                            isNullable: true,
                        }
                
                        ));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "recoverPassword")
    }

}
