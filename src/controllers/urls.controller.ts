import { NextFunction, Response } from 'express';
import UrlService from '@services/url.service';
import { Url } from '@interfaces/url.interface';
import { RequestWithUser } from '@interfaces/auth.interface';
import { CreateUrlDto, EditUrlDto } from '@dtos/url.dto';

class UsersController {
  public urlService = new UrlService();

  public getUrls = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user._id;
      const findAllUsersData: Url[] = await this.urlService.findAll(userId);
      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user._id;
      const urlId = req.params.id;
      const findOneUserData: Url = await this.urlService.findUrlById(urlId, userId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user._id;
      const urlData: CreateUrlDto = req.body;
      const createUrlData: Url = await this.urlService.create(urlData, userId);

      res.status(201).json({ data: createUrlData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user._id;
      const urlId: string = req.params.id;
      const urlData: EditUrlDto = req.body;
      const updateUserData: Url = await this.urlService.update(urlId, urlData, userId);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public remove = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user._id;
      const urlId: string = req.params.id;
      const deleteUrlData: Url = await this.urlService.remove(urlId, userId);

      res.status(200).json({ data: deleteUrlData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
