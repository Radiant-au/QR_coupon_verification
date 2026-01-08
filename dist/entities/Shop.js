"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shop = void 0;
const typeorm_1 = require("typeorm");
const Coupon_1 = require("./Coupon");
const Shopkeeper_1 = require("./Shopkeeper");
let Shop = class Shop {
};
exports.Shop = Shop;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Shop.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Shop.prototype, "shopName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Shop.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Shop.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Shopkeeper_1.Shopkeeper, shopkeeper => shopkeeper.shop),
    __metadata("design:type", Array)
], Shop.prototype, "shopkeepers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Coupon_1.Coupon, coupon => coupon.redeemedAtShop),
    __metadata("design:type", Array)
], Shop.prototype, "scannedCoupons", void 0);
exports.Shop = Shop = __decorate([
    (0, typeorm_1.Entity)()
], Shop);
