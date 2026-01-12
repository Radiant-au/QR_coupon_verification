import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Coupon } from "./Coupon";
import { Shopkeeper } from "./Shopkeeper";

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  shopName: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  // Relations
  @OneToMany(() => Shopkeeper, shopkeeper => shopkeeper.shop, { cascade: true })
  shopkeepers: Shopkeeper[];

  @OneToMany(() => Coupon, coupon => coupon.redeemedAtShop)
  scannedCoupons: Coupon[];
}