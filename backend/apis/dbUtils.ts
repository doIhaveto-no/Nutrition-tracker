import mariadb from 'mariadb';
import dotenv from "dotenv";

dotenv.config();

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT: number = parseInt(process.env.DB_PORT || '3306');

const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || '';
const DB_NAME = process.env.DB_NAME || 'nutrition_tracker';

async function createConnection() {
    return await mariadb.createConnection({
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASS,
        database: DB_NAME,
        allowPublicKeyRetrieval: true
    });
}

export default { createConnection };
export { createConnection };