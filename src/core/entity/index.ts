import {
    Model,
    PrimaryKey,
    AllowNull,
    Column,
    CreatedAt,
    UpdatedAt,
    DataType
} from 'sequelize-typescript';

export abstract class Entity<T> extends Model<T> {

    @PrimaryKey
    @Column(DataType.NUMBER)
    id: number;

    @CreatedAt
    @AllowNull(false)
    @Column({
      field: 'created_at',
      type: DataType.DATE,
    })
    public createdAt: Date;

    @UpdatedAt
    @Column({
      field: 'updated_at',
      type: DataType.DATE
    })
    public updatedAt: Date;

    public static isValid( data: Object ): boolean {
      return false;
    }

    public static getRelations() {
      return [];
    }
}
