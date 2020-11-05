import * as dotenv from 'dotenv';
dotenv.config();

interface AppConfig {
  api: {
    host: string;
    port: number;
  };
  comiv_vine_api: {
    host: string;
  };
}

export const APP_CONFIG: AppConfig = {
  api: {
    host: process.env.API_HOST || '0.0.0.0',
    port: Number(process.env.API_PORT) || 8080,
  },
  comiv_vine_api: {
    host: process.env.COMIC_VINE_API,
  },
};
