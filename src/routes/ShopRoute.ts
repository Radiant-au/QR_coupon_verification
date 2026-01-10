import { Router } from "express";
import { ShopController } from "@controllers/ShopController";
import { authenticateShopKeeperToken } from "@middlewares/AuthMiddleware";

const router = Router();
const shopController = new ShopController();

// Shop Routes
router.post("/", shopController.createShop);
router.get("/", shopController.getAllShops);
router.get("/:id", shopController.getShopById);
router.put("/:id", authenticateShopKeeperToken, shopController.updateShop);
router.patch("/:id/deactivate", shopController.softDeleteShop);
router.patch("/:id/restore", shopController.restoreShop);
router.delete("/:id", shopController.deleteShop);

export default router;