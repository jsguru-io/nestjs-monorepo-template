import { NatsOptions, Transport } from '@nestjs/microservices';

export const getNatsTransportOptions = (): NatsOptions => {
  const host: string = process.env.NATS_HOST;
  const port: string = process.env.NATS_PORT;

  return {
    transport: Transport.NATS,
    options: {
      servers: [`nats://${host}:${port}`],
    },
  };
};
