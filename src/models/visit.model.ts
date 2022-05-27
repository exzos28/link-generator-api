import { model, Schema, Document } from 'mongoose';
import { Visit } from '@interfaces/visit.interface';

const visitSchema: Schema = new Schema({
  ip: {
    type: String,
    required: true,
  },
  country: {
    type: String,
  },
  region: {
    type: String,
  },
  timezone: {
    type: String,
  },
  city: {
    type: String,
  },
  ll: {
    type: Schema.Types.Array,
  },
  area: {
    type: Number,
  },
  urlId: {
    type: Schema.Types.ObjectId,
    ref: 'Url',
  },
});

const visitModel = model<Visit & Document>('Visit', visitSchema);

export default visitModel;
