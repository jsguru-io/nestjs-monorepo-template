import {
  Model,
  Table,
  Default,
  Column,
  DataType,
} from '@jsgurucompany/jsg-nestjs-common';

@Table({
  tableName: 'users',
})
export class User extends Model {
  @Default(DataType.UUIDV4)
  @Column({
    primaryKey: true,
    type: DataType.UUID,
  })
  id: string;

  @Column({
    allowNull: false,
  })
  name: string;

  @Column({
    allowNull: false,
  })
  nevalja: string;
}
