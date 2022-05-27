import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import VisitsController from '@controllers/visits.controller';

export default class VisitsRoute implements Routes {
  public path = '/visits';
  public router = Router();
  public visitsController = new VisitsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/find`, [authMiddleware], this.visitsController.getVisits);
  }
}
