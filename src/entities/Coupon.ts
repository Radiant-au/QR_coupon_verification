import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Shop } from "./Shop";
import { Shopkeeper } from "./ShopKeeper";

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true })
  @Index()
  pinCode: string; // From voting system (e.g., "1LSY7Z")

  @Column({ 
    type: 'enum', 
    enum: ['unused', 'used'],
    default: 'unused'
  })
  @Index()
  status: 'unused' | 'used';

  @Column({ type: 'int', nullable: true })
  redeemedAtShopId: number;

  @Column({ type: 'int', nullable: true })
  scannedByShopkeeperId: number;

  @Column({ type: 'timestamp', nullable: true })
  scannedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => Shop, shop => shop.scannedCoupons, { nullable: true })
  @JoinColumn({ name: 'redeemedAtShopId' })
  redeemedAtShop: Shop;

  @ManyToOne(() => Shopkeeper, shopkeeper => shopkeeper.scannedCoupons, { nullable: true })
  @JoinColumn({ name: 'scannedByShopkeeperId' })
  scannedBy: Shopkeeper;
}