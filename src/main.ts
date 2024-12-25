import { ConfigService } from '@nestjs/config';

import { configureServer } from './bootstrap/server.config';
import { configureGlobals } from './bootstrap/globals.config';
import { configureOpenApi } from './bootstrap/openapi.config';

async function bootstrap() {
  const app = await configureServer();
  const configService = app.get(ConfigService);

  configureGlobals(app);
  configureOpenApi(app);

  await app.listen(configService.getOrThrow<number>('PORT'));
}

bootstrap();
