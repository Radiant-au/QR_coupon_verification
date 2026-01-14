import { CreateShopRequestDto,UpdateShopRequestDto, ShopResponse } from "@dtos/ShopDto";
import { Shop } from "@entities/Shop";
import { ShopRepository } from "@repositories/ShopRepository";
import { AppError } from "@utils/AppError";

export class ShopService {

    // create 
    static async createShop(
        data: CreateShopRequestDto
    ): Promise<ShopResponse> {
       
        const shop = new Shop();
        Object.assign(shop, data);

        const savedShop = await ShopRepository.save(shop);

        return {
            id: savedShop.id,
            shopName: savedShop.shopName,
            isActive: savedShop.isActive,
            createdAt: savedShop.createdAt
        };
    }
    // read all 
    static async getAllShops(): Promise<ShopResponse[]> {
        const shops = await ShopRepository.find({
            relations: ['scannedCoupons']
        });

        return shops.map((shop) => ({
            id: shop.id,
            shopName: shop.shopName,
            isActive: shop.isActive,
            totalScannedCoupons: shop.scannedCoupons.length,
            createdAt: shop.createdAt
        }))
    }
 
   // read one
  static async getShopById(id: number): Promise<ShopResponse> {
    const shop = await ShopRepository.findOneBy({ id });

    if (!shop) {
      throw new AppError("Shop not found", 404);
    }

    return {
      id: shop.id,
      shopName: shop.shopName,
      isActive: shop.isActive,
      createdAt: shop.createdAt,
    };
  }

  // update
  static async updateShop(
    id: number,
    data: UpdateShopRequestDto
  ): Promise<ShopResponse> {
    const shop = await ShopRepository.findOne({
      where: { id },
    });

    if (!shop) {
      throw new AppError("Shop not found", 404);
    }

    Object.assign(shop, data);

    const updatedShop = await ShopRepository.save(shop);

    return {
      id: updatedShop.id,
      shopName: updatedShop.shopName,
      isActive: updatedShop.isActive,
      createdAt: updatedShop.createdAt,
    };
  }
 
  // softe delete
 static async deactivateShop(id: number): Promise<ShopResponse> {
  const shop = await ShopRepository.findOneBy({ id });

  if (!shop) {
    throw new AppError("Shop not found", 404);
  }

  if (!shop.isActive) {
    throw new AppError("Shop is already deactivated", 400);
  }

  shop.isActive = false;
  const updatedShop = await ShopRepository.save(shop);

  return {
    id: updatedShop.id,
    shopName: updatedShop.shopName,
    isActive: updatedShop.isActive,
    createdAt: updatedShop.createdAt,
  };
}

// restore
static async restoreShop(id: number): Promise<ShopResponse> {
     
    // findOneBy
const shop = await ShopRepository.findOneBy({ id });

    if (!shop) {
      throw new AppError("Shop not found", 404);
    }

    if (shop.isActive) {
      throw new AppError("Shop is already active", 400);
    }

    shop.isActive = true;
     const updatedShop = await ShopRepository.save(shop);

  return {
    id: updatedShop.id,
    shopName: updatedShop.shopName,
    isActive: updatedShop.isActive,
    createdAt: updatedShop.createdAt,
  };
  }

  // hard delete
static async hardDeleteShop(id: number, force = false): Promise<void> {
  // 1. Find the shop with its shopkeepers
  const shop = await ShopRepository.findOne({
    where: { id },
    relations: ['shopkeepers'],
  });

  if (!shop) {
    throw new AppError("Shop not found", 404);
  }

  // 2. Safe check: throw error if shopkeepers exist
  if (shop.shopkeepers && shop.shopkeepers.length > 0 && !force) {
    throw new AppError("Cannot delete shop: it has registered shopkeepers", 400);
  }

  // 3. Cascade will automatically delete shopkeepers if force = true
  await ShopRepository.remove(shop);
}


  

}