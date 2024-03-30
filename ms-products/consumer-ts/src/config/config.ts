import { ConfigModuleOptions } from '@nestjs/config';

export const Config: ConfigModuleOptions = {
  envFilePath: '.env',
  isGlobal: true,
};
