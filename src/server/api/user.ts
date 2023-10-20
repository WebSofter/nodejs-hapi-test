import * as Hapi from '@hapi/hapi';
import { Boom, } from '@hapi/boom';
import { IUser, IOutputOk, IOutputEmpty, IUserListCredentials, IUserCredentials, IUpdateCredentials, } from '../interfaces';
import { Errors, ErrorsMessages, Exception, handlerError, outputEmpty, outputOk, } from '../utils';
import { UserRepository, } from '../repositories/UserRepository';

export async function list(r: Hapi.Request): Promise<IOutputEmpty | IOutputOk<IUser> | Boom> {
	try {
		const { email, page, size, } = r.query as IUserListCredentials;
		const users = await UserRepository.getList(email, page, size);
		return outputOk(users);
	} catch (err) {
		return handlerError('Failed user list getting', err);
	}
}

export async function get(r: Hapi.Request): Promise<IOutputEmpty | IOutputOk<IUser> | Boom> {
	try {
		const { id, } = r.params as IUserCredentials;
		const user = await UserRepository.getUser(id);
		return outputOk(user);
	} catch (err) {
		return handlerError('Failed user getting', err);
	}
}
export async function getStatistic(): Promise<IOutputEmpty | IOutputOk<IUser> | Boom> {
	const statistic = await UserRepository.getStatistic();
	return outputOk(statistic);
}
export async function update(r: Hapi.Request): Promise< IOutputEmpty | Boom> {
	try {
		const { id, } = r.params as IUserCredentials;
		const { firstName, lastName, } = r.payload as IUpdateCredentials;
		const result = await UserRepository.update(id, { firstName, lastName, });
		if (!result)
			throw new Exception(Errors.UserNotUpdated, ErrorsMessages[Errors.UserNotUpdated]);
		return outputEmpty();
	} catch (err) {
		return handlerError('Failed to login', err);
	}
}