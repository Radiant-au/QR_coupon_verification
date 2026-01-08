"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponRepository = void 0;
const data_source_1 = require("../config/data-source");
const Coupon_1 = require("../entities/Coupon");
exports.CouponRepository = data_source_1.AppDataSource.getRepository(Coupon_1.Coupon);
