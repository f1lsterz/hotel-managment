import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationFilter } from "./common/filters/validation.filter";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: true, credentials: true, exposedHeaders: ["Set-Cookie"] },
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>("config.server.port");

  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );
  app.useGlobalFilters(new ValidationFilter());

  await app.listen(port);
  console.log(`Started server on localhost:${port}`);
}
bootstrap();
