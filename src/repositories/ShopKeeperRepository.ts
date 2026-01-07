import { AppDataSource } from "@config/data-source";
import { Shopkeeper } from "@entities/Shopkeeper";

export const ShopKeeperRepository = AppDataSource.getRepository(Shopkeeper);