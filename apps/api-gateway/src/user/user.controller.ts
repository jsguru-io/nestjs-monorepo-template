import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { NatsCommunicatorService } from '@app/nats-communicator';
import { PaginatedUsersSet, UserEventPattern } from '@app/user';
import { firstValueFrom } from 'rxjs';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly communicator: NatsCommunicatorService) {}

  @Get()
  @ApiOkResponse({ type: PaginatedUsersSet })
  async findAll(): Promise<PaginatedUsersSet> {
    return firstValueFrom(
      this.communicator.getClient().send(UserEventPattern.FIND_ALL, {}),
    );
  }
}
