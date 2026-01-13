import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Shop } from "./Shop";
import { Shopkeeper } from "./Shopkeeper";

@Entity()
@Index(['id', 'pinCode']) 
@Index(['status', 'scannedAt']) 
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10, unique: true })
  @Index()
  pinCode: string; // From voting system (e.g., "1LSY7Z")

  @Column({ 
    type: 'enum', 
    enum: ['unused', 'used'],
    default: 'unused'
  })
  @Index()
  status: 'unused' | 'used';

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