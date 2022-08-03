import { BaseRepository } from '@jsgurucompany/jsg-nestjs-common';
import { User } from '@app/user/model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }
}
