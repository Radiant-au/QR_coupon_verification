import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Shop } from "./Shop";
import { Coupon } from "./Coupon";

@Entity()
export class Shopkeeper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string; // Hashed

  @Column({ type: 'int', default: 0 })
  totalScanned: number; // How many coupons they've scanned

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => Shop, shop => shop.shopkeepers)
  @JoinColumn({ name: 'shopId' })
  shop: Shop;

  @OneToMany(() => Coupon, coupon => coupon.scannedBy)
  scannedCoupons: Coupon[];
}