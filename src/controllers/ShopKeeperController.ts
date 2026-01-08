import { Request, Response } from "express";
import { ShopKeeperService } from "@services/ShopKeeperService";

const shopkeeperService = new ShopKeeperService();

export class ShopKeeperController {
    static async getAll(req: Request, res: Response) {
        const result = await shopkeeperService.getAll();
        res.json(result);
    }

    static async getOne(req: Request, res: Response) {
        const result = await shopkeeperService.getById(Number(req.params.id));
        result ? res.json(result) : res.status(404).json({ message: "Not found" });
    }

    static async create(req: Request, res: Response) {
        const result = await shopkeeperService.create(req.body);
        res.status(201).json(result);
    }

    static async update(req: Request, res: Response) {
        const result = await shopkeeperService.update(Number(req.params.id), req.body);
        res.json(result);
    }

    static async delete(req: Request, res: Response) {
        await shopkeeperService.delete(Number(req.params.id));
        res.status(204).send();
    }
}