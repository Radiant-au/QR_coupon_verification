import { Router } from "express";
import ShopRoute from "@routes/ShopRoute"
import AuthRoute from "@routes/AuthRoute"

const router = Router();

router.use("/auth",AuthRoute);
// router.use("/pinCode", PinCodeRoute);
// router.use("/auth", AuthRoute);
// router.use("/selection", SelectionRoute);
// router.use("/vote", VoteRoute);
// router.use("/appStatus", AppStatusRoute);
router.use("/shop", ShopRoute)

export default router;