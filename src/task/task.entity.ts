import { UUIDV4 } from 'sequelize';
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/user/user.entity';

@Table({ tableName: 'todos', timestamps: false, paranoid: false })
export class Todos extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    defaultValue: UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare title: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare details: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare todoDone: boolean;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare userId: string;

  @BelongsTo(() => User)
  user: User;
}
