import { NestFactory } from '@nestjs/core';
import { CommandModule, CommandService } from 'nestjs-command';
import { INestApplicationContext } from '@nestjs/common';
import { CliModule } from '@app/cli/cli.module';

const bootstrap = async () => {
  process.env.IS_CLI_CONTEXT = 'true';

  const app: INestApplicationContext =
    await NestFactory.createApplicationContext(CliModule, {
      logger: ['error'],
    });

  try {
    await app.select(CommandModule).get(CommandService).exec();
    await app.close();
  } catch (error) {
    console.error(error);
    await app.close();
    process.exit(1);
  }
};

bootstrap();
