import { Router } from "express";
import ShopRoute from "@routes/ShopRoute"
import AuthRoute from "@routes/AuthRoute"
import ShopkeeperRoute from "@routes/ShopkeeperRoute"
import { authenticateAdminToken } from "@middlewares/AuthMiddleware";
import CouponRoute from "./CouponRoute";
const router = Router();

router.use("/auth",AuthRoute);
router.use("/shop", authenticateAdminToken, ShopRoute)
router.use("/shopkeeper", authenticateAdminToken, ShopkeeperRoute)
router.use("/coupon" , CouponRoute)


export default router;