import { Router } from "express";
import { ShopKeeperController } from "@controllers/AuthController";

const router = Router();
const shopKeeperController = new ShopKeeperController();

// Shopkeeper Routes
router.post("/register", shopKeeperController.registerShopKeeper);
router.post("/login", shopKeeperController.loginShopKeeper);
// router.get("/", shopKeeperController.getAllShopKeepers);
// router.get("/:id", shopKeeperController.getShopKeeperById);

export default router;
