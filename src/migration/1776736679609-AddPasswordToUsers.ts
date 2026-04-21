import { TableColumn } from "typeorm";
import type { MigrationInterface, QueryRunner} from "typeorm";

export class AddPasswordToUsers1776736679609 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn({
            name:"password",
            type:"varchar",
            length:"255",
            isNullable: false,
        }

        ));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "password")
    }

}
