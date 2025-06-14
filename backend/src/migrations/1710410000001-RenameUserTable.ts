import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameUserTable1710410000001 implements MigrationInterface {
    name = 'RenameUserTable1710410000001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // First, create the new users table
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

        // Copy data from user table to users table
        await queryRunner.query(`
            INSERT INTO "users" ("id", "name", "email", "password")
            SELECT "id", "name", "email", "password"
            FROM "user"
        `);

        // Drop the old user table
        await queryRunner.query(`DROP TABLE "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Create the old user table
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

        // Copy data back from users table to user table
        await queryRunner.query(`
            INSERT INTO "user" ("id", "name", "email", "password")
            SELECT "id", "name", "email", "password"
            FROM "users"
        `);

        // Drop the users table
        await queryRunner.query(`DROP TABLE "users"`);
    }
} 