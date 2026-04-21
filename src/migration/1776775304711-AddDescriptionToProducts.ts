import { TableColumn } from "typeorm";
import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddDescriptionToProducts1776775304711 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('products', new TableColumn({
                    name:"description",
                    type:"text",
                    isNullable: false,
                }
        
                ));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("products", "description")
    }

}
