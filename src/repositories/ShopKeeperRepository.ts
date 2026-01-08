import { AppDataSource } from "@config/data-source";
import { Shopkeeper } from "@entities/ShopKeeper";

export const ShopKeeperRepository = AppDataSource.getRepository(Shopkeeper);