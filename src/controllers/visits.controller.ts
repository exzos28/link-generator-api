import { NextFunction, Response } from 'express';
import { RequestWithUser } from '@interfaces/auth.interface';
import VisitsService from '@services/visits.service';
import { Visit } from '@interfaces/visit.interface';
import UrlService from '@services/url.service';
import { Url } from '@interfaces/url.interface';

export default class VisitsController {
  public visitsService = new VisitsService();
  public urlsService = new UrlService();

  public getVisits = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user._id;
      const findAll: Url[] = await this.urlsService.findAll(userId);
      const urlIdList = findAll.map(_ => _._id.toString());
      const findAllUsersData: Visit[] = await this.visitsService.findAllByUrlIdList(urlIdList);

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}
