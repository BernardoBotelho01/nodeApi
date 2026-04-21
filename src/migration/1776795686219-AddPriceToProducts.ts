import { TableColumn } from "typeorm";
import type{ MigrationInterface, QueryRunner } from "typeorm";

export class AddPriceToProducts1776795686219 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.addColumn('products', new TableColumn({
                    name:"price",
                    type:"decimal",
                    precision: 10,
                    scale: 2,
                    isNullable: false
                }
        
                ));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("products", "price")
    }

}
