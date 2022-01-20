import {
  Table,
  Column,
  ForeignKey,
  PrimaryKey,
  AllowNull,
  DataType,
  BelongsTo,
  BeforeCreate,
  BeforeUpdate
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

import { Entity } from './../../../core/entity';

import * as RoleEntity from './../role/entity/role.entity';

@Table({
  tableName: 'users'
})
export default class UserEntity extends Entity<UserEntity> {

  @AllowNull(false)
  @ForeignKey(() => RoleEntity.default)
  @Column({ type: DataType.STRING })
  role_id: string;

  @BelongsTo(() => RoleEntity.default, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  role: RoleEntity.default;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  name: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  password: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING, defaultValue: bcrypt.genSaltSync(10) })
  salt: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  sex: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  age: Date;

  @AllowNull(true)
  @Column(DataType.BOOLEAN)
  is_active: Boolean;

  @AllowNull(true)
  @Column({ type: DataType.STRING, defaultValue: 'no-photo.png' })
  photo: string;

  @BeforeCreate
  @BeforeUpdate
  public static createUser(user) {
    user.senha = this.comparePassword(user);
  }

  public static comparePassword(user: UserEntity, password?: string) {
    password = password || user.password;
    return bcrypt.hashSync(password, user.salt);
  }

  public static getRelations() {
    return [
      { model: RoleEntity.default, required: false },
    ];
  }

}
