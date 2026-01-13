import { AppDataSource } from "@config/data-source";
import { Admin } from "@entities/Admin";
import {
  AdminRepository,
} from "@repositories/AdminRepository";
import { HashUtils } from "@utils/hash";
import { CouponRepository } from "@repositories/CouponRespository";
import { Coupon } from "@entities/Coupon";
import { In } from "typeorm";
import fs from "fs";
import path from "path";
export class SeedService {
  static async seedAdmin() {
    try {
      // Initialize database connection if not already initialized
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
        console.log("Database connection initialized");
      }

      // Check if admin already exists
      const existingAdmin = await AdminRepository.findOneBy({
        username: "Aksadmin",
      });

      if (existingAdmin) {
        console.log("Admin user 'Aksadmin' already exists. Skipping seed.");
        return;
      }

      // Create new admin user
      const admin = new Admin();
      admin.username = "Aksadmin";
      const hashedPassword = await HashUtils.hashPassword("Cqrity@555");
      admin.password = hashedPassword;

      await AdminRepository.save(admin);
      console.log("Admin user 'Aksadmin' created successfully!");
    } catch (error) {
      console.error("Error seeding admin user:", error);
      throw error;
    } finally {
      // Close database connection
      if (AppDataSource.isInitialized) {
        await AppDataSource.destroy();
        console.log("Database connection closed");
      }
    }
  }

  static async seedCoupons() {
    try {
      // Initialize database connection if not already initialized
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
        console.log("Database connection initialized");
      }

      // Read the JSON file
      const codeJsonPath = path.join(__dirname, "../../data/code.json");
      const fileContent = fs.readFileSync(codeJsonPath, "utf-8");
      const pinCodes: string[] = JSON.parse(fileContent);

      if (!Array.isArray(pinCodes) || pinCodes.length === 0) {
        console.log("No pinCodes found in code.json file.");
        return;
      }

      console.log(`Found ${pinCodes.length} pinCodes in code.json`);

      // Check existing coupons to avoid duplicates
      const existingCoupons = await CouponRepository.find({
        where: { pinCode: In(pinCodes) },
      });
      const existingPinCodes = new Set(existingCoupons.map((c) => c.pinCode));

      // Filter out existing pinCodes
      const newPinCodes = pinCodes.filter(
        (code) => !existingPinCodes.has(code)
      );

      if (newPinCodes.length === 0) {
        console.log("All pinCodes already exist in the database. Skipping seed.");
        return;
      }

      console.log(
        `Creating ${newPinCodes.length} new coupons (${existingPinCodes.size} already exist)`
      );

      // Create coupon entities
      const coupons = newPinCodes.map((pinCode) => {
        const coupon = new Coupon();
        coupon.pinCode = pinCode;
        coupon.status = "unused";
        return coupon;
      });

      // Save coupons in batches to avoid overwhelming the database
      const batchSize = 100;
      let savedCount = 0;

      for (let i = 0; i < coupons.length; i += batchSize) {
        const batch = coupons.slice(i, i + batchSize);
        await CouponRepository.save(batch);
        savedCount += batch.length;
        console.log(`Saved ${savedCount}/${coupons.length} coupons...`);
      }

      console.log(
        `Successfully seeded ${coupons.length} coupons to the database!`
      );
    } catch (error) {
      console.error("Error seeding coupons:", error);
      throw error;
    } finally {
      // Close database connection
      if (AppDataSource.isInitialized) {
        await AppDataSource.destroy();
        console.log("Database connection closed");
      }
    }
  }
}