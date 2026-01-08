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
exports.authenticateShopKeeperToken = authenticateShopKeeperToken;
exports.authenticateAdminToken = authenticateAdminToken;
const AdminRepository_1 = require("../repositories/AdminRepository");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticateShopKeeperToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: "Token is not provided" });
            return;
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "defaultSecret");
            req.user = decoded;
            next();
        }
        catch (err) {
            res.status(401).json({ message: "Token is not valid or expired" });
        }
    });
}
function authenticateAdminToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: "Token is not provided" });
            return;
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "defaultSecret");
            if (!(decoded === null || decoded === void 0 ? void 0 : decoded.userId)) {
                res.status(401).json({ message: "Invalid token payload" });
                return;
            }
            const admin = yield AdminRepository_1.AdminRepository.findOneBy({ id: decoded.userId });
            if (admin) {
                next();
            }
            else {
                res.status(401).json({ message: "Token is not valid or expired" });
            }
        }
        catch (err) {
            res.status(401).json({ message: "Token is not valid or expired" });
        }
    });
}
