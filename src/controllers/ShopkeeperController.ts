import { Request, Response } from "express";
import { ShopkeeperService } from "../services/ShopkeeperService";

// Instantiate the service to use its methods
const shopkeeperService = new ShopkeeperService();

export class ShopkeeperController {
  
  static async getAll(req: Request, res: Response) {
    try {
      const result = await shopkeeperService.findAll(); // Handshake with findAll
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getOne(req: Request, res: Response) {
    try {
      const result = await shopkeeperService.findOne(Number(req.params.id)); // Handshake with findOne
      if (!result) return res.status(404).json({ message: "Shopkeeper not found" });
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      // Passes the body (DTO) to the service
      const result = await shopkeeperService.create(req.body); // Handshake with create
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const result = await shopkeeperService.update(Number(req.params.id), req.body); // Handshake with update
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await shopkeeperService.delete(Number(req.params.id)); // Handshake with delete
      res.status(204).send();
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
}