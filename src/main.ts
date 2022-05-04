import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { QueryErrorFilter } from './middleware/constraintErrorHandler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new QueryErrorFilter(httpAdapter));
  await app.listen(5000);
}
bootstrap();
