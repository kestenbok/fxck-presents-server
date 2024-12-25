import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from 'src/app.module';

export async function configureServer() {
  const cors: CorsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  };

  const httpsOptions: HttpsOptions | undefined = undefined;

  // @todo: setup TLS
  // if (Environment.isStaging || Environment.isProduction) {
  // httpsOptions = {
  //     cert: 'some-cert-file.crt',
  //     key: 'some-key-file.pem',
  // };
  // }}

  return NestFactory.create<NestExpressApplication>(AppModule, {
    cors,
    httpsOptions,
  });
}
