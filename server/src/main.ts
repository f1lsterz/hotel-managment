import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationFilter } from "./common/filters/validation.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ValidationFilter());
  await app.listen(process.env.SERVER_PORT ?? 3000);
}
bootstrap();
