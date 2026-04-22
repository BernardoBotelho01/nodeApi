import { TableColumn } from "typeorm";
export class AddRecoverPasswordToUsers1776810773581 {
    async up(queryRunner) {
        await queryRunner.addColumn('users', new TableColumn({
            name: "recoverPassword",
            type: "varchar",
            length: "255",
            isUnique: true,
            isNullable: true,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn("users", "recoverPassword");
    }
}
//# sourceMappingURL=1776810773581-AddRecoverPasswordToUsers.js.map