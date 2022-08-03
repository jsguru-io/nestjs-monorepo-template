import { ModelCtor } from '@jsgurucompany/jsg-nestjs-common';
import { User, UserRepository } from '@app/user';
import { Provider } from '@nestjs/common';

export const modelsProviders: ModelCtor[] = [User];

export const repositoriesProviders: Provider[] = [UserRepository];
