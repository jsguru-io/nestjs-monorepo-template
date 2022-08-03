import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions } from '@nestjs/microservices';
import { getNatsTransportOptions } from '@app/nats-communicator';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  app.connectMicroservice<MicroserviceOptions>(getNatsTransportOptions());

  const apiDocsConfig = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('The API Gateway, mapper to other microservices')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, apiDocsConfig);
  SwaggerModule.setup('api', app, document);

  const config: ConfigService = app.get(ConfigService);

  await app.startAllMicroservices();
  await app.listen(+config.get('API_GATEWAY_PORT') || 3000);
}
bootstrap();
