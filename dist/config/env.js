"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
// src/config/env.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function validateEnv() {
    const requiredVars = [
        'DB_HOST', 'DB_PORT', 'DB_USERNAME', 'DB_PASSWORD',
        'DB_NAME', 'JWT_SECRET'
    ];
    const missing = requiredVars.filter(key => !process.env[key]);
    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
    return {
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_USERNAME: process.env.DB_USERNAME,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_NAME: process.env.DB_NAME,
        JWT_SECRET: process.env.JWT_SECRET,
        JWT_EXPIRE_MINUTES: process.env.JWT_EXPIRE_MINUTES || '15',
        PORT: process.env.PORT || '5000',
        ENV: process.env.ENV || 'development',
        DB_SSL: process.env.DB_SSL || 'false',
        CORS_ORIGINS: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : []
    };
}
exports.env = validateEnv();
