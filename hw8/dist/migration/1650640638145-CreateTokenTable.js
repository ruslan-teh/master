"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTokenTable1650640638145 = void 0;
const typeorm_1 = require("typeorm");
class CreateTokenTable1650640638145 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    isNullable: false,
                    default: 'now()',
                },
                {
                    name: 'deletedAt',
                    type: 'timestamp',
                    isNullable: true,
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
    async down(queryRunner) {
        await queryRunner.dropTable('Tokens', true);
    }
}
exports.CreateTokenTable1650640638145 = CreateTokenTable1650640638145;
//# sourceMappingURL=1650640638145-CreateTokenTable.js.map