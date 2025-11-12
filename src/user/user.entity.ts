import { Model, Column, Table, DataType, HasMany } from 'sequelize-typescript';
import { Todos } from 'src/task/task.entity';

@Table({ tableName: 'todo_User', timestamps: false, paranoid: false })
export class User extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column(DataType.STRING)
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare email?: string;

  @HasMany(() => Todos)
  declare todos: Todos[];
}
