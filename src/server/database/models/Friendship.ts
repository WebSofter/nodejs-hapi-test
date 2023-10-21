import { BelongsTo, Column, DataType, ForeignKey, Model, Table, } from 'sequelize-typescript';
import { User, } from './User';


@Table({
	paranoid: false,
	indexes:[
		{ fields: [ 'receiverId', 'requesterId' ], unique: true, }
	],
})
export class Friendship extends Model {
	@ForeignKey(() => User)
	@Column({
		type: DataType.CHAR,
		allowNull: false,
	})
		receiverId!: string;
	
	@ForeignKey(() => User)
	@Column({
		type: DataType.CHAR,
		allowNull: false,
	})
		requesterId!: string;

	@BelongsTo(() => User)
		user!: User;
}
