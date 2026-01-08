import { Router } from "express";
import { ShopKeeperController } from "@controllers/ShopKeeperController";

const router = Router();

router.get("/", ShopKeeperController.getAll);
router.get("/:id", ShopKeeperController.getOne);
router.post("/", ShopKeeperController.create);
router.put("/:id", ShopKeeperController.update);
router.delete("/:id", ShopKeeperController.delete);

export default router;