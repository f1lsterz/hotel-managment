import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationFilter } from "./common/filters/validation.filter";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>("config.server.port");

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ValidationFilter());

  await app.listen(port);
}
bootstrap();
