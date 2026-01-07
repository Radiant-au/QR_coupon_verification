import { ApplicationService } from "@services/ApplicationService";
import { NextFunction, Request, Response } from "express";

export async function checkAppStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    const applicationService = new ApplicationService();
    const statusData = await applicationService.votingstatus();
    if (statusData.status !== "OPEN") {
        res.status(403).json({ 
            success: false, 
            message: "Voting is currently closed" 
        });
        return;
    }
    next();
}