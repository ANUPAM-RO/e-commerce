import { MigrationInterface, QueryRunner } from "typeorm";
export declare class UpdateUserSchema1710410000000 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
