import { CreateShopkeeperDTO, RegisterResponseDTO, ShopkeeperResponseDto } from "@dtos/ShopkeeperDto";
import { Shopkeeper } from "../entities/Shopkeeper";
import { ShopKeeperRepository } from "@repositories/ShopKeeperRepository";
import { HashUtils } from "@utils/hash";
import { AppError } from "@utils/AppError";
import { ShopRepository } from "@repositories/ShopRepository";
import jwt from "jsonwebtoken";

export class ShopkeeperService {

  async registerShopKeeper(
    data: CreateShopkeeperDTO
  ): Promise<RegisterResponseDTO> {
    const username = data.username.trim();

    const existingShopKeeper = await ShopKeeperRepository.findOneBy({
      username,
    });

    if (existingShopKeeper) {
      throw new AppError("Username already exists", 400);
    }

    const shop = await ShopRepository.findOneBy({
      id: data.shopId,
      isActive: true,
    });

    if (!shop) {
      throw new AppError("Shop not found or inactive", 404);
    }

    const hashedPassword = await HashUtils.hashPassword(data.password);

    const newShopKeeper = ShopKeeperRepository.create({
      username: username,
      password: hashedPassword,
      shop: shop,
    });

    const savedShopKeeper = await ShopKeeperRepository.save(newShopKeeper);

    return {
      id: savedShopKeeper.id,
      username: savedShopKeeper.username,
    };
  }

  static getShopKeeperFromJWT(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "default secret") as { id: number; username: string };
      return decoded.id;
    } catch (error) {
      throw new AppError("Invalid or expired token", 401);
    }
  }

  // HANDSHAKE: findAll
  async findAll(): Promise<ShopkeeperResponseDto[]> {
    const list = await ShopKeeperRepository.find({ relations: ["shop"] });
    return list.map(sk => this.mapToResponseDto(sk));
  }

  // HANDSHAKE: findOne
  async findOne(id: number): Promise<ShopkeeperResponseDto | null> {
    const sk = await ShopKeeperRepository.findOne({
      where: { id },
      relations: ["shop"]
    });
    return sk ? this.mapToResponseDto(sk) : null;
  }


  // HANDSHAKE: delete
  async delete(id: number): Promise<void> {
    const result = await ShopKeeperRepository.delete(id);
    if (result.affected === 0) throw new Error("Shopkeeper not found");
  }

  private mapToResponseDto(entity: Shopkeeper): ShopkeeperResponseDto {
    return {
      id: entity.id,
      username: entity.username,
      totalScanned: entity.totalScanned,
      shopId: entity.shop?.id,
      shopName: entity.shop?.shopName
    };
  }
}