import { Module } from '@nestjs/common';
import { NatsCommunicatorService } from './nats-communicator.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [NatsCommunicatorService],
  exports: [NatsCommunicatorService],
})
export class NatsCommunicatorModule {}
