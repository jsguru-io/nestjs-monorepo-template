import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { NatsCommunicatorModule } from '@app/nats-communicator';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), NatsCommunicatorModule],
  controllers: [UserController],
  providers: [],
})
export class ApiGatewayModule {}
