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
exports.ShopKeeperService = void 0;
const ShopKeeperRepository_1 = require("../repositories/ShopKeeperRepository");
class ShopKeeperService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ShopKeeperRepository_1.ShopKeeperRepository.find({ relations: ["shop"] });
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ShopKeeperRepository_1.ShopKeeperRepository.findOne({ where: { id }, relations: ["shop"] });
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const shopkeeper = ShopKeeperRepository_1.ShopKeeperRepository.create(data);
            return yield ShopKeeperRepository_1.ShopKeeperRepository.save(shopkeeper);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ShopKeeperRepository_1.ShopKeeperRepository.update(id, data);
            return this.getById(id);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ShopKeeperRepository_1.ShopKeeperRepository.delete(id);
        });
    }
}
exports.ShopKeeperService = ShopKeeperService;
