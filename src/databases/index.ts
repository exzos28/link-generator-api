import { MONGO_CONNECT_URL } from '@config';
import { ConnectOptions } from 'mongoose';

export const dbConnection: { url: string; options: ConnectOptions } = {
  url: MONGO_CONNECT_URL,
  options: {
    authSource: 'admin',
  },
};
