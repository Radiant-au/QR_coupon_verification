"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
// import { Shopkeeper } from "../entities/Shopkeeper"; // 1. Import the entity
const path_1 = __importDefault(require("path"));
const env_1 = require("./env");
const isProduction = env_1.env.ENV === "production" || process.env.NODE_ENV === "production";
const fileExt = isProduction ? "js" : "ts";
const isCompiled = __dirname.includes('dist');
const entitiesPath = isCompiled
    ? path_1.default.join(__dirname, '../entities/**/*.js')
    : path_1.default.join(__dirname, '../entities/**/*.ts');
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: env_1.env.DB_HOST,
    port: parseInt(env_1.env.DB_PORT || "5432"),
    username: env_1.env.DB_USERNAME,
    password: env_1.env.DB_PASSWORD,
    database: env_1.env.DB_NAME,
    // entities: [path.resolve(__dirname, `../entities/**/*.${fileExt}`)],
    entities: [entitiesPath],
    migrations: [path_1.default.resolve(__dirname, `../migrations/**/*.${fileExt}`)],
    synchronize: false,
    logging: env_1.env.ENV === 'development',
    extra: {
        connectionLimit: 30, // Allow 30 active connections
        queueLimit: 100, // Unlimited queued requests
        waitForConnections: true // Queue requests instead of failing
    },
    ssl: env_1.env.DB_SSL === 'true' ? {
        rejectUnauthorized: false
    } : false,
});
