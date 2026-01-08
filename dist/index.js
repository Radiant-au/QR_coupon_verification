"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const data_source_1 = require("./config/data-source");
const helmet_1 = __importDefault(require("helmet"));
// import apiRouter from "./routes/index";
// import { errorHandler } from "./middlewares/handler";
const env_1 = require("./config/env");
const index_1 = __importDefault(require("./routes/index"));
data_source_1.AppDataSource.initialize();
const app = (0, express_1.default)();
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: false,
}));
app.use((0, cors_1.default)({
    origin: env_1.env.CORS_ORIGINS ? env_1.env.CORS_ORIGINS : [], // Allow only your React app in development
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow cookies if you're using authentication
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api", index_1.default); //
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});
// app.use('/', cors({}), express.static(path.join(__dirname, '../uploads')));
app.get('/', (req, res) => {
    res.send('Welcome to the vote API');
});
// Mount all routes under /api
// app.use("/api", apiRouter);
// Error handler MUST be last!
// app.use(errorHandler);
const PORT = Number(env_1.env.PORT) || 5000;
const server = app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
// ⭐ GRACEFUL SHUTDOWN FOR CLOUD RUN
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully...');
    server.close(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log('HTTP server closed');
        try {
            yield data_source_1.AppDataSource.destroy();
            console.log('Database connection closed');
            process.exit(0);
        }
        catch (error) {
            console.error('Error during shutdown:', error);
            process.exit(1);
        }
    }));
    // Force shutdown after 10 seconds
    setTimeout(() => {
        console.error('Forcing shutdown after timeout');
        process.exit(1);
    }, 10000);
});
