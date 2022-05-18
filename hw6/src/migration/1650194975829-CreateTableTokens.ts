import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableTokens1650194975829 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'Tokens',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },

                {
                    name: 'refreshToken',
                    type: 'varchar',
                    width: 255,
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: 'userId',
                    type: 'int',
                },
            ],
            foreignKeys: [
                {
                    columnNames: ['userId'],
                    referencedTableName: 'Users',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Tokens', true);
    }
}
