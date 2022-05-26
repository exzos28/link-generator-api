import { model, Schema, Document } from 'mongoose';
import { Geo } from '@interfaces/geo.interface';

const geoSchema: Schema = new Schema({
  ip: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  timezone: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  // latitude, longitude
  ll: {
    type: Schema.Types.Array,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
});

const urlModel = model<Geo & Document>('Geo', geoSchema);

export default urlModel;
