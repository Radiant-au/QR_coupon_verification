import { CreateShopkeeperDTO, RegisterResponseDTO, LoginRequestDTO, LoginResponseDTO } from "@dtos/AuthDto";
import { ShopKeeperRepository } from "@repositories/ShopKeeperRepository";
import { ShopRepository } from "@repositories/ShopRepository";
import { AppError } from "@utils/AppError";
import { HashUtils } from "@utils/hash";
import jwt from "jsonwebtoken";

export class ShopKeeperAuthService {

    // register 
    static async registerShopKeeper(
        data: CreateShopkeeperDTO
    ): Promise<RegisterResponseDTO> {

        const username = data.username.trim();

        const existingShopKeeper = await ShopKeeperRepository.findOneBy({
            username,
        });

        if (existingShopKeeper) { throw new AppError("Username already exists", 400);  }

        const shop = await ShopRepository.findOneBy({
            id: data.shopId,
            isActive: true,
        });

        if (!shop) {  throw new AppError("Shop not found or inactive", 404); }


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

    // login
    static async loginShopKeeper(
        data: LoginRequestDTO
    ): Promise<LoginResponseDTO> {

        const username = data.username.trim();

        const shopkeeper = await ShopKeeperRepository.findOne({
            where: { username },
            relations: ["shop"],
        });

        if (!shopkeeper) { throw new AppError("Invalid username or password", 401); }

        if (!shopkeeper.isActive) { throw new AppError("Account is disabled", 403);}

        const isPasswordValid = await HashUtils.comparePassword(
            data.password,
            shopkeeper.password
        );

        if (!isPasswordValid) {
            throw new AppError("Invalid username or password", 401);
        }

        if (!shopkeeper.shop || !shopkeeper.shop.isActive) {
            throw new AppError("Shop is inactive", 403);
        }

    

        // jwt token
    const token = jwt.sign(
    {
        shopkeeperId: shopkeeper.id,
        role: "shopkeeper"
    },
    process.env.JWT_SECRET ?? "defaultSecret",
    { expiresIn: `${Number(process.env.JWT_EXPIRE_MINUTES) || 1440}m` }
    );


        return { token };
    }



}
