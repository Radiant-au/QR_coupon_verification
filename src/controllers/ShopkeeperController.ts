
import { Request, Response } from "express";
import { ShopkeeperService } from "../services/ShopkeeperService";
import { asyncHandler } from "../middlewares/handler"; // Adjust path based on your project

const shopkeeperService = new ShopkeeperService();

export class ShopkeeperController {
  
  // GET ALL
  static getAll = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const result = await shopkeeperService.findAll();
      res.status(200).json({
        success: true,
        data: result,
      });
    }
  );

  // GET ONE
  static getOne = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const result = await shopkeeperService.findOne(Number(req.params.id));
      if (!result) {
        res.status(404).json({ message: "Shopkeeper not found" });
        return;
      }
      res.status(200).json({
        success: true,
        data: result,
      });
    }
  );



  // DELETE
  static delete = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      await shopkeeperService.delete(Number(req.params.id));
      res.status(204).send();
    }
  );
}