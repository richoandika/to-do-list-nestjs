import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { PrismaService } from 'nestjs-prisma';
import { ConfigService } from '@nestjs/config';
import { CorsConfig, NestConfig } from './common/configs/config.interface';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');
  const corsConfig = configService.get<CorsConfig>('cors');
  const prisma: PrismaService = app.get(PrismaService);
  prisma.enableShutdownHooks(app);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  if (corsConfig.enabled) {
    app.enableCors();
  }
  await app.listen(nestConfig.port);
}
bootstrap();
