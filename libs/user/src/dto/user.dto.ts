import { User } from '@app/user';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedUsersSet {
  @ApiProperty()
  total: number;

  @ApiProperty({ type: [User] })
  data: User[];
}
