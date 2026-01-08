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
exports.Shopkeeper = void 0;
const typeorm_1 = require("typeorm");
const Shop_1 = require("./Shop");
const Coupon_1 = require("./Coupon");
let Shopkeeper = class Shopkeeper {
};
exports.Shopkeeper = Shopkeeper;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Shopkeeper.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Shopkeeper.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, unique: true }),
    __metadata("design:type", String)
], Shopkeeper.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Shopkeeper.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Shopkeeper.prototype, "totalScanned", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Shopkeeper.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Shopkeeper.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Shopkeeper.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Shop_1.Shop, shop => shop.shopkeepers),
    (0, typeorm_1.JoinColumn)({ name: 'shopId' }),
    __metadata("design:type", Shop_1.Shop)
], Shopkeeper.prototype, "shop", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Coupon_1.Coupon, coupon => coupon.scannedBy),
    __metadata("design:type", Array)
], Shopkeeper.prototype, "scannedCoupons", void 0);
exports.Shopkeeper = Shopkeeper = __decorate([
    (0, typeorm_1.Entity)()
], Shopkeeper);
