import { AppDataSource } from "../config/data-source";
import { Shopkeeper } from "../entities/Shopkeeper";
import { Shop } from "../entities/Shop";
import {  ShopkeeperResponseDto } from "../dto/ShopkeeperDto";

export class ShopkeeperService {
  private shopkeeperRepo = AppDataSource.getRepository(Shopkeeper);
  private shopRepo = AppDataSource.getRepository(Shop);

  

  // HANDSHAKE: findAll
  async findAll(): Promise<ShopkeeperResponseDto[]> {
    const list = await this.shopkeeperRepo.find({ relations: ["shop"] });
    return list.map(sk => this.mapToResponseDto(sk));
  }

  // HANDSHAKE: findOne
  async findOne(id: number): Promise<ShopkeeperResponseDto | null> {
    const sk = await this.shopkeeperRepo.findOne({ 
      where: { id }, 
      relations: ["shop"] 
    });
    return sk ? this.mapToResponseDto(sk) : null;
  }


  // HANDSHAKE: delete
  async delete(id: number): Promise<void> {
    const result = await this.shopkeeperRepo.delete(id);
    if (result.affected === 0) throw new Error("Shopkeeper not found");
  }

  private mapToResponseDto(entity: Shopkeeper): ShopkeeperResponseDto {
    return {
      id: entity.id,
      username: entity.username,
      totalScanned: entity.totalScanned,
      isActive: entity.isActive,
      shopId: entity.shop?.id,
      createdAt: entity.createdAt
    };
  }
}