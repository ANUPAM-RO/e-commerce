"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserSchema1710410000000 = void 0;
class UpdateUserSchema1710410000000 {
    constructor() {
        this.name = 'UpdateUserSchema1710410000000';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`UPDATE "user" SET "name" = CONCAT("firstName", ' ', "lastName")`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD "firstName" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastName" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`UPDATE "user" SET "firstName" = SPLIT_PART("name", ' ', 1), "lastName" = SPLIT_PART("name", ' ', 2)`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
    }
}
exports.UpdateUserSchema1710410000000 = UpdateUserSchema1710410000000;
//# sourceMappingURL=1710410000000-UpdateUserSchema.js.map