import { AppDataSource } from "../config/data-source";
import { Shopkeeper } from "../entities/Shopkeeper";
import { Shop } from "../entities/Shop";
import { CreateShopkeeperDto, ShopkeeperResponseDto } from "../dto/ShopkeeperDto";

export class ShopkeeperService {
  private shopkeeperRepo = AppDataSource.getRepository(Shopkeeper);
  private shopRepo = AppDataSource.getRepository(Shop);

  // HANDSHAKE: create
  async create(data: CreateShopkeeperDto): Promise<ShopkeeperResponseDto> {
    const shop = await this.shopRepo.findOneBy({ id: data.shopId });
    if (!shop) throw new Error("Shop not found");

    const newShopkeeper = this.shopkeeperRepo.create({
      ...data,
      shop: shop
    });

    const saved = await this.shopkeeperRepo.save(newShopkeeper);
    return this.mapToResponseDto(saved);
  }

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

  // HANDSHAKE: update
  async update(id: number, data: Partial<CreateShopkeeperDto>): Promise<ShopkeeperResponseDto> {
    const sk = await this.shopkeeperRepo.findOneBy({ id });
    if (!sk) throw new Error("Shopkeeper not found");

    Object.assign(sk, data);
    const updated = await this.shopkeeperRepo.save(sk);
    return this.mapToResponseDto(updated);
  }

  // HANDSHAKE: delete
  async delete(id: number): Promise<void> {
    const result = await this.shopkeeperRepo.delete(id);
    if (result.affected === 0) throw new Error("Shopkeeper not found");
  }

  private mapToResponseDto(entity: Shopkeeper): ShopkeeperResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      username: entity.username,
      totalScanned: entity.totalScanned,
      isActive: entity.isActive,
      shopId: entity.shop?.id,
      createdAt: entity.createdAt
    };
  }
}