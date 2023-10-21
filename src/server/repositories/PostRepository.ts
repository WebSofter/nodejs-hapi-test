import { Op, Transaction, } from 'sequelize';
import { Post, User, } from '../database/models';
import { PostStatus, } from '../enums';
import { POST_LIST_LIMIT, } from '../constants';
import { pagination, } from '../utils/content';

interface IFindByEmailOptions {
	transaction?: Transaction;
}

interface IFindByIdOptions {
	transaction?: Transaction;
}

interface IFindByKeywordOptions {
	transaction?: Transaction;
	scope?: string;
}

interface ICreateOptions {
	transaction?: Transaction;
}

interface IUpdateOptions {
	transaction?: Transaction;
}
export class PostRepository {
	static async getList(keyword: string | undefined, page = 1, size: number = POST_LIST_LIMIT, options: IFindByEmailOptions = {}): Promise<Post[] | null> {
		const { transaction, } = options;
		let condition = {}
		if(keyword) {
			condition = {[Op.or]: [
				{
					title: `%${keyword}%`,
				},
				{
					content: `%${keyword}%`,
				}
			],}
		}

		return Post.findAll({
			where: condition,
			...pagination(page, size),
			transaction,
			include: User,
		});
	}

	static async getPost(id: string, options: IFindByIdOptions = {}): Promise<Post | null> {
		const { transaction, } = options;
		return Post.findByPk(id, { transaction, include: User, });
	}

	static async delete(id: string, options: IFindByIdOptions = {}): Promise<number | null> {
		const { transaction, } = options;
		return Post.destroy({
			where: {
			  id,
			},
			transaction,
		});
	}

	static async update(
		userId: string,
		values: Partial<Post>,
		options: IUpdateOptions = {}
	): Promise<[number, Post[]]> {
		const { transaction, } = options;

		return Post.update({ ...values, }, {
			where: {
			   userId,
			},
			transaction,
		});
	}

	static async findByUserId(
		id: string,
		options: IFindByKeywordOptions = {}
	): Promise<Post | null> {
		const { transaction, scope = 'defaultScope', } = options;

		return Post.scope(scope).findOne({
			where: {
				userId: { [Op.eq]: id, },
			},
			transaction,
		});
	}

	static async create(
		values: Partial<Post>,
		options: ICreateOptions = {}
	): Promise<Post | null> {
		const { transaction, } = options;

		return Post.create({
			...values,
			status: PostStatus.Draft,
		}, {
			transaction,
		});
	}
}
