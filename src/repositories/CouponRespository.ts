import { AppDataSource } from "@config/data-source";
import { Coupon } from "@entities/Coupon";

export const CouponRepository = AppDataSource.getRepository(Coupon);