import { Column, DataType, ForeignKey, Model, Table, } from 'sequelize-typescript';
import { User, } from './User';


@Table({
	paranoid: true,
})
export class Friendship extends Model {
	@ForeignKey(() => User)
	@Column({
		type: DataType.UUID,
		allowNull: true,
	})
		receiverId!: string;
	
	@ForeignKey(() => User)
	@Column({
		type: DataType.UUID,
		allowNull: true,
	})
		requesterId!: string;

}
