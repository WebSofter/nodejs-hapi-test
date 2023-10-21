import { ServerRoute, } from '@hapi/hapi';
import * as api from '../api/post';
import * as post from '../schemas/post';
import { outputEmptySchema, outputOkSchema, } from '../schemas/common';

export default <ServerRoute[]>[
	{
		method: 'GET',
		path: '/post/list',
		handler: api.list,
		options: {
			auth: false,
			id: 'post.list',
			description: 'Post list',
			tags: ['api', 'post'],
			validate: {
				query: post.listSchema,
			},
			response: {
				schema: outputOkSchema(post.listSchema),
			},
		},
	},
	{
		method: 'GET',
		path: '/post/{id}',
		handler: api.get,
		options: {
			auth: false,
			id: 'post.get',
			description: 'Post getting',
			tags: ['api', 'post'],
			response: {
				schema: outputOkSchema(post.postSchema),
			},
		},
	},
	{
		method: 'PATCH',
		path: '/post/{id}',
		handler: api.update,
		options: {
			id: 'post.update',
			description: 'Update post',
			tags: ['api', 'post'],
			validate: {
				payload: post.updatePostSchema,
			},
			response: {
				schema: outputEmptySchema(),
			},
		},
	},
	{
		method: 'POST',
		path: '/post',
		handler: api.create,
		options: {
			id: 'post.create',
			description: 'Create post',
			tags: ['api', 'post'],
			validate: {
				payload: post.createPostSchema,
			},
			response: {
				schema: outputEmptySchema(),
			},
		},
	},
	{
		method: 'DELETE',
		path: '/post/{id}',
		handler: api.deletePost,
		options: {
			id: 'post.delete',
			description: 'Delete post',
			tags: ['api', 'post'],
			response: {
				schema: outputEmptySchema(),
			},
		},
	}
];
