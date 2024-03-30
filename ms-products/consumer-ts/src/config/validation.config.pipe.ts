import { ValidationPipe } from '@nestjs/common';

export const configPipe = new ValidationPipe({
  transformOptions: {
    enableImplicitConversion: true,
  },
});
