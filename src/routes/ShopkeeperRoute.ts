import { Router } from "express";
import { ShopkeeperController } from "../controllers/ShopkeeperController";
const router = Router();

/**
 * @route   GET /api/shopkeepers
 * @desc    Get all shopkeepers
 */
router.get("/", ShopkeeperController.getAll);

/**
 * @route   GET /api/shopkeepers/:id
 * @desc    Get a single shopkeeper by ID
 */
router.get("/:id", ShopkeeperController.getOne);


/**
 * @route   DELETE /api/shopkeepers/:id
 * @desc    Delete a shopkeeper
 */
router.delete("/:id", ShopkeeperController.delete);

export default router;