import { Op, Sequelize, Transaction, } from 'sequelize';
import { Friendship, User, } from '../database/models';
import { UserStatus, } from '../enums';
import { USER_LIST_LIMIT, } from '../constants';
import { pagination, } from '../utils/content';

interface IFindByEmailOptions {
	transaction?: Transaction;
}

interface IFindByIdOptions {
	transaction?: Transaction;
}

interface IFindByLoginOptions {
	transaction?: Transaction;
	scope?: string;
}
interface IFindByCreatedAtOptions {
	transaction?: Transaction;
}
interface ICreateOptions {
	transaction?: Transaction;
}

interface IUpdateOptions {
	transaction?: Transaction;
}
export class UserRepository {
	static async getList(email: string | undefined, page = 1, size: number = USER_LIST_LIMIT, options: IFindByEmailOptions = {}): Promise<User[] | null> {
		const { transaction, } = options;
		const condition = email ? { email: { [Op.like]: `%${email}%`, }, } : {};
		return User.findAll({
			where: condition,
			...pagination(page, size),
			transaction,
		});
	}
	static async getUser(id: string, options: IFindByIdOptions = {}): Promise<User | null> {
		const { transaction, } = options;
		return User.findByPk(id, { transaction, });
	}
	static async getStatistic(days = 30, options: IFindByCreatedAtOptions = {}): Promise<{ rows: User[]; count: number; } | null> {
		const { transaction, } = options;
		const condition = {
			createdAt: {
				[Op.gte]: Sequelize.literal(`current_date - interval '${days} day'`),
			},
		}
		return User.findAndCountAll({
			where: condition,
			transaction,
		})
	}
	static async update(
		id: string,
		values: Partial<User>,
		options: IUpdateOptions = {}
	): Promise<[number, User[]]> {
		const { transaction, } = options;

		return User.update({ ...values, }, {
			where: {
			   id,
			},
			transaction,
		});
	}
	static async findByEmail(email: string, options: IFindByEmailOptions = {}): Promise<User | null> {
		const { transaction, } = options;

		return User.findOne({
			where: {
				email,
			},
			transaction,
		});
	}

	static async findByLogin(
		login: string,
		options: IFindByLoginOptions = {}
	): Promise<User | null> {
		const { transaction, scope = 'defaultScope', } = options;

		return User.scope(scope).findOne({
			where: {
				[Op.or]: [
					{
						email: login,
					},
					{
						phone: login,
					}
				],
			},
			transaction,
		});
	}

	static async create(
		values: Partial<User>,
		options: ICreateOptions = {}
	): Promise<User | null> {
		const { transaction, } = options;

		return User.create({
			...values,
			status: UserStatus.Active,
		}, {
			transaction,
		});
	}

	static async addFriend(
		requesterId: string, 
		receiverId: string,
		options: ICreateOptions = {}
	): Promise<Friendship> {
		const { transaction, } = options;
		return Friendship.create({
			requesterId,
			receiverId,
		}, {
			transaction,
		});
	}

	static async deleteFriend(
		requesterId: string, 
		receiverId: string, 
		options: IFindByIdOptions = {}): Promise<number | null> {
		const { transaction, } = options;
		return Friendship.destroy({
			where: {
				requesterId,
				receiverId,
			},
			transaction,
		});
	}

	static async getFriends(id: string, page = 1, size: number = USER_LIST_LIMIT, options: IFindByEmailOptions = {}): Promise<Friendship[] | null> {
		const { transaction, } = options;
		return Friendship.findAll({
			where: {
				requesterId: id,
			},
			...pagination(page, size),
			transaction,
		});
	}

	static async getFriendsStat(id: string, options: IFindByEmailOptions = {}): Promise<number | null> {
		const { transaction, } = options;
		return Friendship.count({
			where: {
				requesterId: id,
			},
			transaction,
		})
	}
}
