import { Request, Response } from "express";
import { asyncHandler } from "@middlewares/handler";
import { ShopKeeperAuthService } from "@services/AuthService";

export class ShopKeeperController {

  // REGISTER SHOPKEEPER
  loginAdmin = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const data = req.body;

      const result = await ShopKeeperAuthService.Adminlogin(data);

      res.status(201).json({
        message: "Admin logged in successfully",
        data: result,
      });
    }
  );




// LOGIN SHOPKEEPER
  loginShopKeeper = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const loginData = req.body;

      const result = await ShopKeeperAuthService.loginShopKeeper(loginData);

      res.status(200).json({
        message: "Login successful",
        data: result, // { token: string }
      });
    }
  );
}
