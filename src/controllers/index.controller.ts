import { NextFunction, Request, Response } from 'express';
import { Url } from '@interfaces/url.interface';
import UrlService from '@services/url.service';
import GeoService from '@services/visits.service';
import requestIp from 'request-ip';

class IndexController {
  private urlService = new UrlService();
  private geoService = new GeoService();

  public index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const url = req.params.url;
      const clientIp: string = requestIp.getClientIp(req);
      const findUrl: Url = await this.urlService.findUrlByShort(url);
      await this.urlService.addClick(findUrl._id);
      await this.geoService.addVisit(findUrl._id, clientIp);
      return res.redirect(findUrl.origUrl);
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
