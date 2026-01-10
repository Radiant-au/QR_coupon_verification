import { IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";


// registe request
export class CreateShopkeeperDTO {

  @IsString()
  @IsNotEmpty()
  name: string;          // Display name (can be duplicate)

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
  name: string;

  @IsString()
  username: string;
}

//---------------
// login request
export class LoginRequestDTO {

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

//login response
export class LoginResponseDTO {
  token: string;   // JWT token
}


