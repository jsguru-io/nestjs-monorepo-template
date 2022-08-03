import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  NatsOptions,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NatsCommunicatorService {
  private client: ClientProxy;

  constructor(private configService: ConfigService) {
    this.client = ClientProxyFactory.create(this.getConfig());
  }

  getConfig(): NatsOptions {
    const host: string = this.configService.get('NATS_HOST');
    const port: string = this.configService.get('NATS_PORT');

    return {
      transport: Transport.NATS,
      options: {
        servers: [`nats://${host}:${port}`],
      },
    };
  }

  getClient(): ClientProxy {
    return this.client;
  }
}
