import { Visit } from '@interfaces/visit.interface';
import { getIpInfo } from '@modules/geoip/getIpInfo';
import { Url } from '@interfaces/url.interface';
import visitModel from '@models/visit.model';

export default class VisitsService {
  public visit = visitModel;

  public async findAll(): Promise<Visit[]> {
    return this.visit.find();
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
    const res = getIpInfo(ip);
    await this.visit.create({
      ip: ip,
      urlId,
      ...res,
    });
  }
}
