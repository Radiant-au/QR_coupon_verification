import { LoginRequestDTO, LoginResponseDTO } from "@dtos/AuthDto";
import { AdminRepository } from "@repositories/AdminRepository";
import { ShopKeeperRepository } from "@repositories/ShopKeeperRepository";
import { AppError } from "@utils/AppError";
import { HashUtils } from "@utils/hash";
import bcrypt from "bcryptjs";
import type { StringValue } from "ms";
import jwt, { SignOptions } from "jsonwebtoken";

export class ShopKeeperAuthService {
  // login admin
  static async Adminlogin(data: LoginRequestDTO): Promise<{ token: string }> {
    const user = await AdminRepository.findOneBy({ username: data.username });
    if (user && (await bcrypt.compare(data.password, user.password))) {
      const expiresIn: StringValue = (
        process.env.JWT_EXPIRE_MINUTES
          ? `${process.env.JWT_EXPIRE_MINUTES}m`
          : "15m"
      ) as StringValue;
      const options: SignOptions = { expiresIn };
      const token = jwt.sign(
        { id: user.id, username: user.username, role: "admin" },
        process.env.JWT_SECRET || "defaultSecret",
        options
      );
      return { token };
    }
    throw new AppError("Invalid email or password", 401);
  }

  // login ShopKeeper
  static async loginShopKeeper(
    data: LoginRequestDTO
  ): Promise<LoginResponseDTO> {
    const username = data.username.trim();

    const shopkeeper = await ShopKeeperRepository.findOne({
      where: { username },
      relations: ["shop"],
    });

    if (!shopkeeper) {
      throw new AppError("Invalid username or password", 401);
    }

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
        id: shopkeeper.id,
        role: "shopkeeper",
      },
      process.env.JWT_SECRET ?? "defaultSecret",
      {
        expiresIn: `${
          Number(process.env.JWT_EXPIRE_MINUTES) || 1440
        }m` as StringValue,
      }
    );

    return { token };
  }
}
