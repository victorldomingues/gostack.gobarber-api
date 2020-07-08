import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AlterProviderFiledToProdiverId1593280112368 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'provider');
        await queryRunner.addColumn('appointments', new TableColumn({
            name: 'provider_id',
            type: 'uuid',
            isNullable: true,
            generationStrategy: 'uuid'
        }));
        await queryRunner.createForeignKey('appointments', new TableForeignKey({
            name: 'FK_APPOINTMENTS_USER_PROVIDER_ID',
            columnNames: ['provider_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments', 'FK_APPOINTMENTS_USER_PROVIDER_ID');
        await queryRunner.dropColumn('appointments', 'provider_id');
        await queryRunner.addColumn('appointments', new TableColumn({
            name: 'provider',
            type: 'varchar',
        }));
    }


}
