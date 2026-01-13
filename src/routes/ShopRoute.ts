import { Router } from "express";
import { ShopController } from "@controllers/ShopController";
import { validateBody } from "@middlewares/ValidationMiddleware";
import { CreateShopRequestDto, UpdateShopRequestDto } from "@dtos/ShopDto";

const router = Router();
const shopController = new ShopController();

// Shop Routes
router.post("/", validateBody(CreateShopRequestDto) ,shopController.createShop);
router.get("/", shopController.getAllShops);
router.get("/:id", shopController.getShopById);
router.put("/:id",validateBody(UpdateShopRequestDto) ,shopController.updateShop);
router.patch("/:id/deactivate", shopController.softDeleteShop);
router.patch("/:id/restore", shopController.restoreShop);
router.delete("/:id", shopController.deleteShop);

export default router;