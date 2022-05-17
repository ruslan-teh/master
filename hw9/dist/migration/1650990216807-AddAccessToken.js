"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAccessToken1650990216807 = void 0;
class AddAccessToken1650990216807 {
    async up(queryRunner) {
        await queryRunner.query('ALTER TABLE Tokens ADD COLUMN accessToken VARCHAR (255) NOT NULL');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE Tokens DROP COLUMN accessToken');
    }
}
exports.AddAccessToken1650990216807 = AddAccessToken1650990216807;
//# sourceMappingURL=1650990216807-AddAccessToken.js.map