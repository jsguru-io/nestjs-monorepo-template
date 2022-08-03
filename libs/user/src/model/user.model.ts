import {
  Model,
  Table,
  Default,
  Column,
  DataType,
} from '@jsgurucompany/jsg-nestjs-common';
import { ApiProperty } from '@nestjs/swagger';

@Table({
  tableName: 'users',
})
export class User extends Model {
  @ApiProperty()
  @Default(DataType.UUIDV4)
  @Column({
    primaryKey: true,
    type: DataType.UUID,
  })
  id: string;

  @ApiProperty()
  @Column
  name: string;

  @ApiProperty()
  @Column
  email: string;

  @ApiProperty()
  @Column
  password: string;
}
