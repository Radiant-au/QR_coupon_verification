"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAppStatus = checkAppStatus;
const ApplicationService_1 = require("../services/ApplicationService");
function checkAppStatus(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const applicationService = new ApplicationService_1.ApplicationService();
        const statusData = yield applicationService.votingstatus();
        if (statusData.status !== "OPEN") {
            res.status(403).json({
                success: false,
                message: "Voting is currently closed"
            });
            return;
        }
        next();
    });
}
