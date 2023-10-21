import { BelongsTo, Column, DataType, ForeignKey, Model, Table, } from 'sequelize-typescript';
import { getUUID, } from '../../utils';
import { User, } from './User';
import { PostStatus, } from '../../enums';


@Table({
	paranoid: true,
})
export class Post extends Model {
	@Column({
		primaryKey: true,
		type: DataType.UUID,
		defaultValue: () => getUUID(),
	})
	override id!: string;

	@ForeignKey(() => User)
	@Column({
		type: DataType.UUID,
		allowNull: false,
	})
		userId!: string;

	@Column({
		type: DataType.STRING,
		defaultValue: () => null,
	})
		title!: string;

	@Column({
		type: DataType.TEXT,
		defaultValue: () => null,
	})
		content!: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
		defaultValue: PostStatus.Draft,
	})
		status!: PostStatus;

	@BelongsTo(() => User)
		user!: User;
}
