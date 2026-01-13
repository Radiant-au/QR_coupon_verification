import { Router } from "express";
import { ShopkeeperController } from "../controllers/ShopkeeperController";
import { validateBody } from "@middlewares/ValidationMiddleware";
import { CreateShopkeeperDTO } from "@dtos/ShopkeeperDto";
const router = Router();

router.get("/", ShopkeeperController.getAll);
router.get("/:id", ShopkeeperController.getOne);
router.post("/",validateBody(CreateShopkeeperDTO) ,ShopkeeperController.create);
router.delete("/:id", ShopkeeperController.delete);

export default router;