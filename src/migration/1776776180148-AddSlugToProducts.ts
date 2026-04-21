import { TableColumn } from "typeorm";
import type{ MigrationInterface, QueryRunner } from "typeorm";

export class AddSlugToProducts1776776180148 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('products', new TableColumn({
                    name:"slug",
                    type:"varchar",
                    length:"255",
                    isUnique: true,
                    isNullable: false,
                }
        
                ));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("products", "slug")
    }

}
