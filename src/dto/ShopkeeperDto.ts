import { IsString, IsNotEmpty, IsInt, MinLength, IsOptional, IsBoolean } from 'class-validator';



/**
 * Used for API responses to hide sensitive data like password
 */
export class ShopkeeperResponseDto {
  id: number;
  username: string;
  totalScanned: number;
  isActive: boolean;
  shopId: number;
  createdAt: Date;
}