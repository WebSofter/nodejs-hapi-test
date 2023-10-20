import * as Hapi from '@hapi/hapi';
import { Boom, } from '@hapi/boom';
import { IUser, IOutputOk, IOutputEmpty, IUserListCredentials, IUserCredentials, } from '../interfaces';
import { handlerError, outputOk, } from '../utils';
import { UserRepository, } from '../repositories/UserRepository';

export async function list(r: Hapi.Request): Promise<IOutputEmpty | IOutputOk<IUser> | Boom> {
	try {
		const { email, page, size, } = r.query as IUserListCredentials;
		const users = await UserRepository.getList(email, page, size);
		return outputOk(users);
	} catch (err) {
		return handlerError('Failed to login', err);
	}
}

export async function get(r: Hapi.Request): Promise<IOutputEmpty | IOutputOk<IUser> | Boom> {
	try {
		const { id, } = r.params as IUserCredentials
		const user = await UserRepository.getUser(id);
		return outputOk(user);
	} catch (err) {
		return handlerError('Failed to login', err);
	}
}