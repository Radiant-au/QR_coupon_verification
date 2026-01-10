import { Request, Response } from "express";
import { asyncHandler } from "@middlewares/handler";
import { ShopService } from "@services/ShopService";

export class ShopController {

  // CREATE SHOP
  createShop = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const shopData = req.body;
      const shop = await ShopService.createShop(shopData);
      res.status(201).json({
        message: "Shop created successfully",
        data: shop,
      });
    }
  );

  // GET ALL SHOPS (only active by default)
  getAllShops = asyncHandler(
    async (_req: Request, res: Response): Promise<void> => {
      const shops = await ShopService.getAllShops();
      res.status(200).json({
        message: "Shops fetched successfully",
        data: shops,
      });
    }
  );

  // GET SHOP BY ID
  getShopById = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const id = parseInt(req.params.id, 10);
      const shop = await ShopService.getShopById(id);
      res.status(200).json({
        message: "Shop fetched successfully",
        data: shop,
      });
    }
  );

  // UPDATE SHOP
  updateShop = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const id = parseInt(req.params.id, 10);
      const data = req.body;
      const updatedShop = await ShopService.updateShop(id, data);
      res.status(200).json({
        message: "Shop updated successfully",
        data: updatedShop,
      });
    }
  );

  // SOFT DELETE / DEACTIVATE SHOP
  softDeleteShop = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const id = parseInt(req.params.id, 10);
      const updatedShop = await ShopService.deactivateShop(id);
      res.status(200).json({
        message: "Shop deactivated successfully",
        data: updatedShop,
      });
    }
  );

  // RESTORE SHOP
  restoreShop = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const id = parseInt(req.params.id, 10);
      const updatedShop = await ShopService.restoreShop(id);
      res.status(200).json({
        message: "Shop restored successfully",
        data: updatedShop,
      });
    }
  );

  // HARD DELETE SHOP

deleteShop = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);
    const force = req.query.force === "true";
    await ShopService.hardDeleteShop(id, force);
    res.status(200).json({
      message: "Shop deleted successfully",
    });
  }
);

}