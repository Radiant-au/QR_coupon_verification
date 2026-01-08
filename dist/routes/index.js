"use strict";
// import { Router } from "express";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = Router();
// // router.use("/pinCode", PinCodeRoute);
// // router.use("/auth", AuthRoute);
// // router.use("/selection", SelectionRoute);
// // router.use("/vote", VoteRoute);
// // router.use("/appStatus", AppStatusRoute);
// export default router;
const express_1 = require("express");
const ShopKeeperRoute_1 = __importDefault(require("./ShopKeeperRoute"));
const apiRouter = (0, express_1.Router)();
apiRouter.use("/shopkeepers", ShopKeeperRoute_1.default);
exports.default = apiRouter;
