import { env } from 'process';
import { Config } from './config.interface';

const config: Config = {
  nest: {
    port: +env.APP_PORT || 3000,
    public_key: env.APP_PUBLIC_KEY,
  },
  cors: {
    enabled: true,
  },
  security: {
    expiresIn: '2m',
    refreshIn: '3d',
    bcryptSaltRound: 10,
  },
};

export default (): Config => config;
