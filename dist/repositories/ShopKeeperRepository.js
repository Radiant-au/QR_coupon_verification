"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopKeeperRepository = void 0;
const data_source_1 = require("../config/data-source");
const Shopkeeper_1 = require("../entities/Shopkeeper");
exports.ShopKeeperRepository = data_source_1.AppDataSource.getRepository(Shopkeeper_1.Shopkeeper);
