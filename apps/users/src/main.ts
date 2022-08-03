import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { getNatsTransportOptions } from '@app/nats-communicator';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    getNatsTransportOptions(),
  );

  await app.listen();
}
bootstrap();
