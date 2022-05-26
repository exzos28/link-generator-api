import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import UrlsController from '@controllers/urls.controller';
import validationMiddleware from '@middlewares/validation.middleware';
import { UrlDto } from '@dtos/url.dto';
import authMiddleware from '@middlewares/auth.middleware';

class UrlsRoute implements Routes {
  public path = '/urls';
  public router = Router();
  public urlsController = new UrlsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, [authMiddleware], this.urlsController.getUrls);
    this.router.get(`${this.path}/:id`, [authMiddleware], this.urlsController.getById);
    this.router.post(`${this.path}`, [authMiddleware, validationMiddleware(UrlDto, 'body')], this.urlsController.create);
    this.router.put(`${this.path}/:id`, [authMiddleware, validationMiddleware(UrlDto, 'body', true)], this.urlsController.update);
    this.router.delete(`${this.path}/:id`, [authMiddleware], this.urlsController.remove);
  }
}

export default UrlsRoute;
