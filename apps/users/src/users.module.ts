import { Module } from '@nestjs/common';
import { UsersHandler } from './users.handler';
import { UsersService } from './users.service';
import { DatabaseModule } from '@app/database';
import { NatsCommunicatorModule } from '@app/nats-communicator';

@Module({
  imports: [DatabaseModule, NatsCommunicatorModule],
  controllers: [],
  providers: [UsersHandler, UsersService],
})
export class UsersModule {}
