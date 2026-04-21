import { TableColumn } from "typeorm";
export class AddPasswordToUsers1776736679609 {
    async up(queryRunner) {
        await queryRunner.addColumn('users', new TableColumn({
            name: "password",
            type: "varchar",
            length: "255",
            isNullable: false,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn("users", "password");
    }
}
//# sourceMappingURL=1776736679609-AddPasswordToUsers.js.map