import { UsersService } from './users.service';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PaginatedUsersSet, UserEventPattern } from '@app/user';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(UserEventPattern.FIND_ALL)
  findAll(): Promise<PaginatedUsersSet> {
    return this.usersService.findAll();
  }
}
