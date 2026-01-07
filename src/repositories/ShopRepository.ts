import { AppDataSource } from "@config/data-source";
import { Shop } from "@entities/Shop";

export const ShopRepository = AppDataSource.getRepository(Shop);