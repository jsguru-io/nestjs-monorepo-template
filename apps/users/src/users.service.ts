import { Injectable } from '@nestjs/common';
import { User, UserRepository } from '@app/user';
import { BaseCrudService } from '@jsgurucompany/jsg-nestjs-common';

@Injectable()
export class UsersService extends BaseCrudService<User, UserRepository> {
  constructor(public readonly repository: UserRepository) {
    super(repository);
  }
}
