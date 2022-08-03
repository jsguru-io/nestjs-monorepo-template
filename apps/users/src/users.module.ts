import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from '@app/database';
import { NatsCommunicatorModule } from '@app/nats-communicator';

@Module({
  imports: [DatabaseModule, NatsCommunicatorModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
