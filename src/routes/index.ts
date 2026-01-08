// import { Router } from "express";

// const router = Router();

// // router.use("/pinCode", PinCodeRoute);
// // router.use("/auth", AuthRoute);
// // router.use("/selection", SelectionRoute);
// // router.use("/vote", VoteRoute);
// // router.use("/appStatus", AppStatusRoute);

// export default router;
import { Router } from "express";
import shopkeeperRouter from "./ShopKeeperRoute";

const apiRouter = Router();
apiRouter.use("/shopkeepers", shopkeeperRouter);

export default apiRouter;