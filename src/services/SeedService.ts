import { AppDataSource } from "@config/data-source";
import { Admin } from "@entities/Admin";
import {
  AdminRepository,
} from "@repositories/AdminRepository";
import { HashUtils } from "@utils/hash";
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


}