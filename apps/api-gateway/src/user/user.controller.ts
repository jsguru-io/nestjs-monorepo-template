import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NatsCommunicatorService } from '@app/nats-communicator';
import { UserEventPattern } from '@app/user';
import { firstValueFrom } from 'rxjs';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly communicator: NatsCommunicatorService) {}

  @Get()
  async findAll(): Promise<any> {
    // return [];
    return await this.communicator.getClient().send('getUsers', {}).toPromise();
  }
}
