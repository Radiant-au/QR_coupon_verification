import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1768430984365 implements MigrationInterface {
    name = 'Migration1768430984365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."coupon_status_enum" AS ENUM('unused', 'used')`);
        await queryRunner.query(`CREATE TABLE "coupon" ("id" SERIAL NOT NULL, "pinCode" character varying(10) NOT NULL, "status" "public"."coupon_status_enum" NOT NULL DEFAULT 'unused', "scannedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "redeemedAtShopId" integer, "scannedByShopkeeperId" integer, CONSTRAINT "UQ_c714e1ea38bdd03cb35e412d7b6" UNIQUE ("pinCode"), CONSTRAINT "PK_fcbe9d72b60eed35f46dc35a682" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c714e1ea38bdd03cb35e412d7b" ON "coupon" ("pinCode") `);
        await queryRunner.query(`CREATE INDEX "IDX_19cb8077475907aea2d87904ad" ON "coupon" ("status") `);
        await queryRunner.query(`CREATE INDEX "IDX_7791539354b99195caa695586d" ON "coupon" ("status", "scannedAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_2de4c22e6fd3c0a92bf9b76051" ON "coupon" ("id", "pinCode") `);
        await queryRunner.query(`CREATE TABLE "shop" ("id" SERIAL NOT NULL, "shopName" character varying(100) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ad47b7c6121fe31cb4b05438e44" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shopkeeper" ("id" SERIAL NOT NULL, "username" character varying(100) NOT NULL, "password" character varying(255) NOT NULL, "totalScanned" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "shopId" integer, CONSTRAINT "UQ_38c9051c44e6cde1e04d97b6c3c" UNIQUE ("username"), CONSTRAINT "PK_4fe879a28ce3cd5b3c7b5744430" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admin" ("id" SERIAL NOT NULL, "username" character varying(100) NOT NULL, "password" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_5e568e001f9d1b91f67815c580f" UNIQUE ("username"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD CONSTRAINT "FK_2a644d885acf71a4fa2d697e79d" FOREIGN KEY ("redeemedAtShopId") REFERENCES "shop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD CONSTRAINT "FK_5cce6cb0f4e38bcb7c93dcdbb0e" FOREIGN KEY ("scannedByShopkeeperId") REFERENCES "shopkeeper"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shopkeeper" ADD CONSTRAINT "FK_9ca00779c283ba581defed6061b" FOREIGN KEY ("shopId") REFERENCES "shop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shopkeeper" DROP CONSTRAINT "FK_9ca00779c283ba581defed6061b"`);
        await queryRunner.query(`ALTER TABLE "coupon" DROP CONSTRAINT "FK_5cce6cb0f4e38bcb7c93dcdbb0e"`);
        await queryRunner.query(`ALTER TABLE "coupon" DROP CONSTRAINT "FK_2a644d885acf71a4fa2d697e79d"`);
        await queryRunner.query(`DROP TABLE "admin"`);
        await queryRunner.query(`DROP TABLE "shopkeeper"`);
        await queryRunner.query(`DROP TABLE "shop"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2de4c22e6fd3c0a92bf9b76051"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7791539354b99195caa695586d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_19cb8077475907aea2d87904ad"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c714e1ea38bdd03cb35e412d7b"`);
        await queryRunner.query(`DROP TABLE "coupon"`);
        await queryRunner.query(`DROP TYPE "public"."coupon_status_enum"`);
    }

}
