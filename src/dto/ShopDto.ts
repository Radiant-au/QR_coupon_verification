import { IsBoolean, IsOptional, IsString, Length } from "class-validator";

export class CreateShopRequestDto {

  @IsString({ message: "Shop name must be a string" })
  @Length(1, 100, { message: "Shop name must be between 1 and 100 characters" })
  shopName: string;

  @IsOptional()
  @IsBoolean({ message: "isActive must be a boolean" })
  isActive?: boolean;
}


export class UpdateShopRequestDto {

  @IsOptional()
  @IsString()
  @Length(1, 100)
  shopName?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export interface ShopResponse {
  id: number;
  shopName: string;
  isActive: boolean;
  createdAt: Date;
}
