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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopKeeperController = void 0;
const ShopKeeperService_1 = require("../services/ShopKeeperService");
const shopkeeperService = new ShopKeeperService_1.ShopKeeperService();
class ShopKeeperController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield shopkeeperService.getAll();
            res.json(result);
        });
    }
    static getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield shopkeeperService.getById(Number(req.params.id));
            result ? res.json(result) : res.status(404).json({ message: "Not found" });
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield shopkeeperService.create(req.body);
            res.status(201).json(result);
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield shopkeeperService.update(Number(req.params.id), req.body);
            res.json(result);
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield shopkeeperService.delete(Number(req.params.id));
            res.status(204).send();
        });
    }
}
exports.ShopKeeperController = ShopKeeperController;
