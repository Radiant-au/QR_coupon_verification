import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCascadeToShopkeepers1675123456789 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "shopkeeper"
            DROP CONSTRAINT "FK_9ca00779c283ba581defed6061b",
            ADD CONSTRAINT "FK_9ca00779c283ba581defed6061b"
            FOREIGN KEY ("shopId") REFERENCES "shop"("id") ON DELETE CASCADE;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "shopkeeper"
            DROP CONSTRAINT "FK_9ca00779c283ba581defed6061b",
            ADD CONSTRAINT "FK_9ca00779c283ba581defed6061b"
            FOREIGN KEY ("shopId") REFERENCES "shop"("id") ON DELETE NO ACTION;
        `);
    }
}
