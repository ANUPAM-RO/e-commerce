"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenameUserTable1710410000001 = void 0;
class RenameUserTable1710410000001 {
    constructor() {
        this.name = 'RenameUserTable1710410000001';
    }
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                CONSTRAINT "UQ_users_email" UNIQUE ("email"),
                CONSTRAINT "PK_users" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "users" ("id", "name", "email", "password")
            SELECT "id", "name", "email", "password"
            FROM "user"
        `);
        await queryRunner.query(`DROP TABLE "user"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                CONSTRAINT "UQ_user_email" UNIQUE ("email"),
                CONSTRAINT "PK_user" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "user" ("id", "name", "email", "password")
            SELECT "id", "name", "email", "password"
            FROM "users"
        `);
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
exports.RenameUserTable1710410000001 = RenameUserTable1710410000001;
//# sourceMappingURL=1710410000001-RenameUserTable.js.map