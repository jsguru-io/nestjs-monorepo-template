import { UsersService } from './users.service';
import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { User, UserEventPattern } from '@app/user';
import { PaginatedSet } from '@jsgurucompany/jsg-nestjs-common';

@Injectable()
export class UsersHandler {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('getUsers')
  findAll() {
    return [];
    return this.usersService.findAll();
  }
}
