import * as Hapi from '@hapi/hapi';
import { Boom, } from '@hapi/boom';
import { IUser, IOutputOk, IOutputEmpty, IUserListCredentials, IUserCredentials, IUpdateCredentials, } from '../interfaces';
import { Errors, ErrorsMessages, Exception, handlerError, outputEmpty, outputOk, } from '../utils';
import { UserRepository, } from '../repositories/UserRepository';
import { Friendship, } from '../database/models';

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

export async function getFriends(r: Hapi.Request): Promise<IOutputEmpty | IOutputOk<Friendship[]> | Boom> {
	try {
		const { id, } = r.params as IUserCredentials;
		const friends = await UserRepository.getFriends(id);
		return outputOk(friends);
	} catch (err) {
		return handlerError('Failed friends getting', err);
	}
}

export async function getFriendsStat(r: Hapi.Request): Promise<IOutputEmpty | IOutputOk<number> | Boom> {
	try {
		const { id, } = r.params as IUserCredentials;
		const friends = await UserRepository.getFriendsStat(id);
		return outputOk(friends);
	} catch (err) {
		return handlerError('Failed friends statistic getting', err);
	}
}

export async function addFriend(r: Hapi.Request): Promise<IOutputOk<Friendship> | Boom> {
	try {
		const { id : requesterId, } = r.auth.credentials.user as IUser
		const { id : receiverId, } = r.payload as IUser;
		const result = await UserRepository.addFriend(requesterId, receiverId);
		return outputOk(result);
	} catch (err) {
		return handlerError('Failed friend adding', err);
	}
}

export async function deleteFriend(r: Hapi.Request): Promise<IOutputEmpty | IOutputOk<IUser> | Boom> {
	try {
		const { id : requesterId, } = r.auth.credentials.user as IUser
		const { id : receiverId, } = r.payload as IUser;
		const result = await UserRepository.deleteFriend(requesterId, receiverId);
		return outputOk(result);
	} catch (err) {
		return handlerError('Failed friend deleting', err);
	}
}