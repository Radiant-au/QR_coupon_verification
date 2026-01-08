"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopRepository = void 0;
const data_source_1 = require("../config/data-source");
const Shop_1 = require("../entities/Shop");
exports.ShopRepository = data_source_1.AppDataSource.getRepository(Shop_1.Shop);
