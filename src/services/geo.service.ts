import { Geo } from '@interfaces/geo.interface';
import geoModel from '@models/geo.model';
import { getIpInfo } from '@modules/geoip/getIpInfo';

class UrlService {
  public geo = geoModel;

  public async findAll(): Promise<Geo[]> {
    return this.geo.find();
  }

  public async addVisit(urlId: string, ip: string) {
    const res = getIpInfo(ip);
    if (!res) {
      return;
    }
    await this.geo.create({
      ip: ip,
      ...res,
    });
  }
}
export default UrlService;
