import { model, Schema, Document } from 'mongoose';
import { Url } from '@interfaces/url.interface';

const urlSchema: Schema = new Schema({
  origUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const urlModel = model<Url & Document>('Url', urlSchema);

export default urlModel;
