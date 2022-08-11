import { Module } from '@nestjs/common';
import {
  DatabaseModule as JsgDatabaseModule,
  ModelCtor,
} from '@jsgurucompany/jsg-nestjs-common';
import { CommandModule } from 'nestjs-command';
import {
  modelsProviders,
  repositoriesProviders,
} from '@app/database/database.providers';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JsgDatabaseModule.registerAsync({
      useFactory: (config: ConfigService) => {
        const models: ModelCtor[] =
          process.env.IS_CLI_CONTEXT === 'true' ? [] : [...modelsProviders];

        return {
          connection: {
            host: config.get('DB_HOST'),
            port: +config.get('DB_PORT') || 5432,
            username: config.get('DB_USER'),
            password: config.get('DB_PASSWORD'),
            database: config.get('DB_NAME'),
            models,
          },
          migrator: {
            path: `${__dirname}/../migrations`,
            glob: 'libs/**/migrations/*.migration.ts',
          },
        };
      },
      inject: [ConfigService],
    }),
    CommandModule,
  ],
  providers: [...repositoriesProviders],
  exports: [...repositoriesProviders],
})
export class DatabaseModule {}
