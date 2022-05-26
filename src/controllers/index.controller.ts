import { NextFunction, Request, Response } from 'express';
import { Url } from '@interfaces/url.interface';
import UrlService from '@services/url.service';
import GeoService from '@services/geo.service';

class IndexController {
  private urlService = new UrlService();
  private geoService = new GeoService();

  public index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const url = req.params.url;
      const ip = req.ip;
      const findUrl: Url = await this.urlService.findUrlByShort(url);
      await this.geoService.addVisit(findUrl._id, ip);

      return res.json({ res: req.socket.remoteAddress });
      // res.redirect(findUrl.origUrl);
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
