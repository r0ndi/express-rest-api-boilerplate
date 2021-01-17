import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateSchema1610732143176 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstname" character varying(64) NOT NULL, "lastname" character varying(64) NOT NULL, "email" character varying(64) NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a3ffb1c0c8416b9fc6f907b743" ON "users" ("id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_a3ffb1c0c8416b9fc6f907b743"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
