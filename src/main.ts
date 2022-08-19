import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';


async function bootstrap() {
  const CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  };

  const app = await NestFactory.create(AppModule);

  app.enableCors(CorsOptions);
  app.useGlobalPipes(new ValidationPipe());


  const options = new DocumentBuilder()
    .setTitle(`Wallet App API`)
    .setDescription(`Application Programming Interface for Wallet App`)
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT')
    .build();

  const customOption: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };


  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document, customOption);
  await app.listen(process.env.API_PORT);
}
bootstrap();
