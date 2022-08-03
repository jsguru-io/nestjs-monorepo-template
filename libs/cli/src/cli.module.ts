import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { CommandModule } from 'nestjs-command';

@Module({
  imports: [DatabaseModule, CommandModule],
  providers: [],
  exports: [],
})
export class CliModule {}
