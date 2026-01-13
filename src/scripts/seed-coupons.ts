import "reflect-metadata";
import { SeedService } from "../services/SeedService";

async function runSeed() {
  try {
    await SeedService.seedCoupons();
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed coupons:", error);
    process.exit(1);
  }
}

runSeed();
