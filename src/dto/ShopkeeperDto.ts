import { IsString, IsNotEmpty, IsInt, MinLength, IsOptional, IsBoolean } from 'class-validator';

/**
 * Used when creating a new Shopkeeper
 */
export class CreateShopkeeperDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsInt()
  @IsNotEmpty()
  shopId: number;
}

/**
 * Used for API responses to hide sensitive data like password
 */
export class ShopkeeperResponseDto {
  id: number;
  name: string;
  username: string;
  totalScanned: number;
  isActive: boolean;
  shopId: number;
  createdAt: Date;
}