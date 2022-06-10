import { Visit } from '@interfaces/visit.interface';
import { Url } from '@interfaces/url.interface';
import visitModel from '@models/visit.model';
import geoip from 'geoip-lite';

export type GeoIp = {
  range: number[];
  country: string;
  region: string;
  eu: string;
  timezone: string;
  city: string;
  ll: [number, number];
  metro: number;
  area: number;
};

export default class VisitsService {
  public visit = visitModel;

  public async findAll(): Promise<Visit[]> {
    return this.visit.find();
  }

  private static _getIpInfo(ip: string): GeoIp | null {
    return geoip.lookup(ip);
  }

  public async findAllByUrlIdList(urlIdList: Url['_id'][]): Promise<Visit[]> {
    const result: Visit[] = await this.visit.aggregate([
      {
        $lookup: {
          from: 'urls',
          localField: 'urlId',
          foreignField: '_id',
          as: 'url',
        },
      },
      {
        $set: {
          url: { $arrayElemAt: ['$url', 0] },
        },
      },
    ]);
    return result.filter(_ => urlIdList.includes(_.urlId.toString()));
  }

  public async addVisit(urlId: string, ip: string) {
    const res = VisitsService._getIpInfo(ip);
    await this.visit.create({
      ip: ip,
      urlId,
      ...res,
    });
  }
}
