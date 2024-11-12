import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options: CorsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET, POST",
    allowedHeaders: "*",
  };
  app.enableCors(options);
  await app.listen(3000);
  const hostname = 'localhost';
  const port = 3000;
  // app.useGlobalPipes(new ValidationPipe({
  //   whitelist: true,
  //   forbidNonWhitelisted: true,
  //   transform: true,
  // }));
  console.log(`Server is running on http://${hostname}:${port}`);

}
bootstrap();
