import { AppDataSource } from "@config/data-source";
import { generateQRTokenResDto, RedeemCouponReqDto,RedeemCouponResDto } from "@dtos/CouponDto";
import { Coupon } from "@entities/Coupon";
import { Shop } from "@entities/Shop";
import { Shopkeeper } from "@entities/Shopkeeper";
import { CouponRepository } from "@repositories/CouponRespository";
import { ShopRepository } from "@repositories/ShopRepository";
import { AppError } from "@utils/AppError";
import * as crypto from 'crypto';

export class CouponService {
  
  private static readonly SECRET_KEY: string = process.env.COUPON_SECRET_KEY || 'your-secret-key-min-32-chars!!!';

  // ============== HMAC SIGNATURE GENERATION ==============
  
  /**
   * Generate HMAC signature to prevent QR tampering
   */
  private static generateSignature(data: any): string {
    return crypto
      .createHmac('sha256', this.SECRET_KEY)
      .update(JSON.stringify(data))
      .digest('hex');
  }

  /**
   * Verify HMAC signature
   */
  private static verifySignature(data: any, signature: string): boolean {
    const expectedSignature = this.generateSignature(data);
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  }

  // ============== STATIC QR TOKEN GENERATION ==============
  
  /**
   * Generate static QR token from pinCode (ONE TIME)
   * Called by voting app frontend
   * This token never expires - validation happens on scan
   */
  static async generateStaticQRToken(pinCode: string): Promise<generateQRTokenResDto> {
    // Verify coupon exists and is unused
    const coupon = await CouponRepository.findOne({
      where: { pinCode }
    });

    if (!coupon) {
      throw new AppError("Invalid coupon or already used", 404);
    }

    // Create payload (no timestamp needed!)
    const payload = {
      pinCode: coupon.pinCode,
      couponId: coupon.id
    };

    // Generate HMAC signature
    const signature = this.generateSignature(payload);

    // Combine payload + signature
    const tokenData = {
      ...payload,
      signature
    };

    // Encode to base64 for QR
    const token = Buffer.from(JSON.stringify(tokenData)).toString('base64');

    return {
      token,
      pinCode: coupon.pinCode,
      status: coupon.status
    };
  }

  // ============== QR VERIFICATION & REDEMPTION ==============
  
  /**
   * Verify QR token and redeem coupon
   * Called when shopkeeper scans QR
   */
static async redeemCoupon(
    data: RedeemCouponReqDto
  ): Promise<RedeemCouponResDto> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Decode & verify token (no DB hit)
      const decoded = JSON.parse(
        Buffer.from(data.token, 'base64').toString('utf8')
      );
      const { signature, ...payload } = decoded;

      if (!this.verifySignature(payload, signature)) {
        throw new AppError("Invalid QR code - signature mismatch", 400);
      }

      // 2. Get shopkeeper's shop ID (lightweight query - just the ID)
      const shopkeeper = await queryRunner.manager.findOne(Shopkeeper, {
        where: { id: data.shopkeeperId },
        relations: ['shop']
      });

      if (!shopkeeper || !shopkeeper.shop) {
        throw new AppError("Shopkeeper or shop not found", 404);
      }

      // 3. Lock coupon row for update (NO JOINS - that's the fix!)
      const coupon = await queryRunner.manager
        .getRepository(Coupon)
        .createQueryBuilder('coupon')
        .setLock('pessimistic_write')
        .where('coupon.id = :id', { id: payload.couponId })
        .andWhere('coupon.pinCode = :pinCode', { pinCode: payload.pinCode })
        .getOne();

      if (!coupon) {
        throw new AppError("Coupon not found", 404);
      }

      // 4. Check status (still protected by lock)
      if (coupon.status === 'used') {
        // Load shop info separately if needed for error message
        const shopInfo = await queryRunner.manager.findOne(Shop, {
          where: { id: coupon.redeemedAtShop?.id },
          select: ['shopName']
        });
        
        throw new AppError(
          `Already redeemed at ${shopInfo?.shopName || 'unknown'} on ${coupon.scannedAt?.toLocaleDateString()}`,
          400
        );
      }

      // 5. Update coupon (single query)
      await queryRunner.manager.update(
        Coupon,
        { id: coupon.id },
        {
          status: 'used',
          scannedAt: new Date(),
          redeemedAtShop: { id: shopkeeper.shop.id },
          scannedBy: { id: data.shopkeeperId }
        }
      );

      // 6. Increment shopkeeper counter (atomic operation)
      await queryRunner.manager.increment(
        Shopkeeper,
        { id: data.shopkeeperId },
        'totalScanned',
        1
      );

      await queryRunner.commitTransaction();

      return {
        success: true,
        message: "Coupon redeemed successfully!",
        coupon: coupon.pinCode
      };

    } catch (error) {
      await queryRunner.rollbackTransaction();
      
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("Invalid QR code format", 400);
    } finally {
      await queryRunner.release();
    }
  }

  // ============== COUPON CRUD ==============
  
  /**
   * Get coupon by pinCode
   */
  static async getCouponByPinCode(pinCode: string): Promise<Coupon> {
    const coupon = await CouponRepository.findOne({
      where: { pinCode },
      relations: ['redeemedAtShop', 'scannedBy']
    });

    if (!coupon) {
      throw new AppError("Coupon not found", 404);
    }

    return coupon;
  }

  /**
   * Get all coupons (with optional filters)
   */
  static async getAllCoupons(filters?: {
    status?: 'unused' | 'used';
    shopId?: number;
  }): Promise<Coupon[]> {
    const query = CouponRepository.createQueryBuilder('coupon')
      .leftJoinAndSelect('coupon.redeemedAtShop', 'shop')
      .leftJoinAndSelect('coupon.scannedBy', 'shopkeeper');

    if (filters?.status) {
      query.andWhere('coupon.status = :status', { status: filters.status });
    }

    if (filters?.shopId) {
      query.andWhere('coupon.redeemedAtShopId = :shopId', { shopId: filters.shopId });
    }

    return await query.getMany();
  }

  /**
   * Get coupon statistics
   */
  static async getCouponStats(): Promise<{
    total: number;
    unused: number;
    used: number;
    usageRate: number;
  }> {
    const [unused, used] = await Promise.all([
      CouponRepository.count({ where: { status: 'unused' } }),
      CouponRepository.count({ where: { status: 'used' } })
    ]);

    const total = unused + used;
    const usageRate = total > 0 ? (used / total) * 100 : 0;

    return {
      total,
      unused,
      used,
      usageRate: Math.round(usageRate * 100) / 100
    };
  }

  /**
   * Get shop redemption history
   */
  static async getShopRedemptionHistory(shopId: number): Promise<Coupon[]> {
    const shop = await ShopRepository.findOneBy({ id: shopId });
    
    if (!shop) {
      throw new AppError("Shop not found", 404);
    }

    return await CouponRepository.find({
      where: { 
        redeemedAtShop: { id: shopId },
        status: 'used'
      },
      relations: ['scannedBy'],
      order: { scannedAt: 'DESC' }
    });
  }

  /**
   * Check coupon status without redeeming (for preview)
   */
  static async checkCouponStatus(token: string): Promise<{
    valid: boolean;
    status: 'unused' | 'used' | 'invalid';
    pinCode?: string;
    usedAt?: {
      shopName: string;
      scannedAt: Date;
    };
  }> {
    try {
      const decoded = JSON.parse(
        Buffer.from(token, 'base64').toString('utf8')
      );

      const { signature, ...payload } = decoded;

      // Verify signature
      if (!this.verifySignature(payload, signature)) {
        return { valid: false, status: 'invalid' };
      }

      // Check coupon
      const coupon = await CouponRepository.findOne({
        where: { 
          id: payload.couponId,
          pinCode: payload.pinCode 
        },
        relations: ['redeemedAtShop']
      });

      if (!coupon) {
        return { valid: false, status: 'invalid' };
      }

      if (coupon.status === 'used') {
        return {
          valid: false,
          status: 'used',
          pinCode: coupon.pinCode,
          usedAt: {
            shopName: coupon.redeemedAtShop?.shopName || 'Unknown',
            scannedAt: coupon.scannedAt
          }
        };
      }

      return {
        valid: true,
        status: 'unused',
        pinCode: coupon.pinCode
      };

    } catch (error) {
      return { valid: false, status: 'invalid' };
    }
  }
}