import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationFilter } from "./common/filters/validation.filter";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ValidationFilter());
  await app.listen(process.env.SERVER_PORT ?? 3000);
}
bootstrap();
