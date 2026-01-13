import { IsString, IsNotEmpty, IsInt, MinLength, IsOptional, IsBoolean } from 'class-validator';



/**
 * Used for API responses to hide sensitive data like password
 */
export interface ShopkeeperResponseDto {
  id: number;
  username: string;
  totalScanned: number;
  shopId: number;
  shopName: string;
}

// registe request
export class CreateShopkeeperDTO {

  @IsString()
  @IsNotEmpty()
  username: string;      // Login identifier (MUST be unique)

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsInt()
  shopId: number;
}

//register response
export class RegisterResponseDTO {
  @IsInt()
  id: number;

  @IsString()
  username: string;
}