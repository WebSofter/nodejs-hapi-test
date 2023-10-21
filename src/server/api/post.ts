import * as Hapi from '@hapi/hapi';
import { Boom, } from '@hapi/boom';
import { IPost, IOutputOk, IOutputEmpty, IPostListCredentials, IPostCredentials, IPostUpdateCredentials, IUser, } from '../interfaces';
import { Errors, ErrorsMessages, Exception, handlerError, outputEmpty, outputOk, } from '../utils';
import { PostRepository, } from '../repositories/PostRepository';

export async function list(r: Hapi.Request): Promise<IOutputEmpty | IOutputOk<IPost> | Boom> {
	try {
		const { keyword, page, size, } = r.query as IPostListCredentials;
		const posts = await PostRepository.getList(keyword, page, size);
		return outputOk(posts);
	} catch (err) {
		return handlerError('Failed post list getting', err);
	}
}

export async function get(r: Hapi.Request): Promise<IOutputEmpty | IOutputOk<IPost> | Boom> {
	try {
		const { id, } = r.params as IPostCredentials;
		const post = await PostRepository.getPost(id);
		return outputOk(post);
	} catch (err) {
		return handlerError('Failed post getting', err);
	}
}

export async function update(r: Hapi.Request): Promise< IOutputEmpty | Boom> {
	try {
		const { id, } = r.auth.credentials.user as IUser
		const payload = r.payload as IPostUpdateCredentials;
		const result = await PostRepository.update(id, payload);
		if (!result)
			throw new Exception(Errors.PostNotUpdated, ErrorsMessages[Errors.PostNotUpdated]);
		return outputEmpty();
	} catch (err) {
		return handlerError('Failed post updating', err);
	}
}

export async function create(r: Hapi.Request): Promise< IOutputEmpty | Boom> {
	try {
		const { id, } = r.auth.credentials.user as IUser
		const payload = r.payload as IPostUpdateCredentials;
		const result = await PostRepository.create({ ...payload, userId: id, });
		if (!result)
			throw new Exception(Errors.PostNotUpdated, ErrorsMessages[Errors.PostNotUpdated]);
		return outputEmpty();
	} catch (err) {
		return handlerError('Failed post creating', err);
	}
}

export async function deletePost(r: Hapi.Request): Promise< IOutputEmpty | Boom> {
	try {
		const { id, } = r.params as IPostCredentials;
		const result = await PostRepository.delete(id);
		if (!result)
			throw new Exception(Errors.PostNotDeleted, ErrorsMessages[Errors.PostNotDeleted]);
		return outputEmpty();
	} catch (err) {
		return handlerError('Failed post deleting', err);
	}
}