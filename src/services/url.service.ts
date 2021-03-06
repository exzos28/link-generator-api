import urlModel from '@models/url.model';
import { Url } from '@interfaces/url.interface';
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import { CreateUrlDto, EditUrlDto } from '@dtos/url.dto';
import { nanoid } from 'nanoid';

class UrlService {
  public urls = urlModel;

  public async findAll(userId: string): Promise<Url[]> {
    return this.urls.find({ createdBy: userId });
  }

  public async findUrlById(urlId: string, userId: string): Promise<Url> {
    if (isEmpty(urlId)) throw new HttpException(400, "You're not urlId");

    const findUrl: Url = await this.urls.findOne({ _id: urlId, createdBy: userId });
    if (!findUrl) throw new HttpException(404, 'Not found');

    return findUrl;
  }

  public async addClick(urlId: string) {
    const findUrl = await this.urls.findOne({ _id: urlId });
    findUrl.clicks = findUrl.clicks + 1;
    await findUrl.save();

    return findUrl;
  }

  public async findUrlByShort(shortUrl: string): Promise<Url> {
    if (isEmpty(shortUrl)) throw new HttpException(400, "You're not url");

    const findUrl: Url = await this.urls.findOne({ shortUrl: shortUrl });
    if (!findUrl) throw new HttpException(404, 'Not found');

    return findUrl;
  }

  public async create(urlData: CreateUrlDto, userId: string): Promise<Url> {
    if (isEmpty(urlData)) throw new HttpException(400, "You're not url data");
    return this.urls.create({ origUrl: urlData.url, shortUrl: nanoid(5), createdBy: userId });
  }

  public async update(urlId: string, urlData: EditUrlDto, userId: string): Promise<Url> {
    if (isEmpty(urlData)) throw new HttpException(400, "You're not url data");
    const updateUrlById: Url = await this.urls.findOneAndUpdate({ _id: urlId, createdBy: userId }, { origUrl: urlData.origUrl });
    if (!updateUrlById) throw new HttpException(409, "You're not url");

    return updateUrlById;
  }

  public async remove(urlId: string, userId: string): Promise<Url> {
    return this.urls.findOneAndDelete({ _id: urlId, createdBy: userId });
  }
}

export default UrlService;
