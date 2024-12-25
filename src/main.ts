import { ConfigService } from '@nestjs/config';

import { configureServer } from './bootstrap/server.bootstrap';
import { configureGlobals } from './bootstrap/globals.bootstrap';
import { configureOpenApi } from './bootstrap/openapi.bootstrap';

async function bootstrap() {
  const app = await configureServer();
  const configService = app.get(ConfigService);

  configureGlobals(app);
  configureOpenApi(app);

  await app.listen(configService.getOrThrow<number>('PORT'));
}

bootstrap();
