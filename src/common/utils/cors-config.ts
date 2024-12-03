import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { appConfig } from 'src/config/app.config';

export const getCorsConfig = (): CorsOptions => ({
  origin: appConfig.isProduction ? appConfig.allowedOrigins : true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
});
