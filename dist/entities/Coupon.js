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
exports.Coupon = void 0;
const typeorm_1 = require("typeorm");
const Shop_1 = require("./Shop");
const Shopkeeper_1 = require("./Shopkeeper");
let Coupon = class Coupon {
};
exports.Coupon = Coupon;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Coupon.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, unique: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Coupon.prototype, "pinCode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['unused', 'used'],
        default: 'unused'
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Coupon.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Coupon.prototype, "redeemedAtShopId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Coupon.prototype, "scannedByShopkeeperId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Coupon.prototype, "scannedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Coupon.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Coupon.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Shop_1.Shop, shop => shop.scannedCoupons, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'redeemedAtShopId' }),
    __metadata("design:type", Shop_1.Shop)
], Coupon.prototype, "redeemedAtShop", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Shopkeeper_1.Shopkeeper, shopkeeper => shopkeeper.scannedCoupons, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'scannedByShopkeeperId' }),
    __metadata("design:type", Shopkeeper_1.Shopkeeper)
], Coupon.prototype, "scannedBy", void 0);
exports.Coupon = Coupon = __decorate([
    (0, typeorm_1.Entity)()
], Coupon);
