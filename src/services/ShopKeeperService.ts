import { ShopKeeperRepository } from "@repositories/ShopKeeperRepository";
import { Shopkeeper } from "@entities/Shopkeeper";

export class ShopKeeperService {
    async getAll() {
        return await ShopKeeperRepository.find({ relations: ["shop"] });
    }

    async getById(id: number) {
        return await ShopKeeperRepository.findOne({ where: { id }, relations: ["shop"] });
    }

    async create(data: Partial<Shopkeeper>) {
        const shopkeeper = ShopKeeperRepository.create(data);
        return await ShopKeeperRepository.save(shopkeeper);
    }

    async update(id: number, data: Partial<Shopkeeper>) {
        await ShopKeeperRepository.update(id, data);
        return this.getById(id);
    }

    async delete(id: number) {
        return await ShopKeeperRepository.delete(id);
    }
}