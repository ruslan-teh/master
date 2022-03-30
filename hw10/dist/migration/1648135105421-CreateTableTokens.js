"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableTokens1648135105421 = void 0;
class CreateTableTokens1648135105421 {
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Tokens (
                id INT PRIMARY KEY AUTO_INCREMENT,
                accessToken VARCHAR(250) NOT NULL,
                refreshToken VARCHAR(250) NOT NULL,
                userId INT NOT NULL,
                FOREIGN KEY (userId) REFERENCES Users (id)
            )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE IF EXIST Tokens
        `);
    }
}
exports.CreateTableTokens1648135105421 = CreateTableTokens1648135105421;
//# sourceMappingURL=1648135105421-CreateTableTokens.js.map