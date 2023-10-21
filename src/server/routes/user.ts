import { ServerRoute, } from '@hapi/hapi';
import * as api from '../api/user';
import * as user from '../schemas/user';
import { outputEmptySchema, outputOkSchema, } from '../schemas/common';

export default <ServerRoute[]>[
	{
		method: 'GET',
		path: '/user/list',
		handler: api.list,
		options: {
			auth: false,
			id: 'user.list',
			description: 'User list',
			tags: ['api', 'user'],
			validate: {
				query: user.listSchema,
			},
			response: {
				schema: outputOkSchema(user.listSchema),
			},
		},
	},
	{
		method: 'GET',
		path: '/user/{id}',
		handler: api.get,
		options: {
			auth: false,
			id: 'user.get',
			description: 'User getting',
			tags: ['api', 'user'],
			response: {
				schema: outputOkSchema(user.userSchema),
			},
		},
	},
	{
		method: 'PATCH',
		path: '/user/{id}',
		handler: api.update,
		options: {
			//auth: true,
			id: 'user.update',
			description: 'Update user',
			tags: ['api', 'user'],
			validate: {
				payload: user.updateUserSchema,
			},
			response: {
				schema: outputEmptySchema(),
			},
		},
	},
	{
		method: 'GET',
		path: '/user/statistic',
		handler: api.getStatistic,
		options: {
			auth: false,
			id: 'user.getStatistic',
			description: 'User statistic',
			tags: ['api', 'user'],
			response: {
				schema: outputOkSchema(user.userSchema),
			},
		},
	},
	{
		method: 'GET',
		path: '/user/{id}/friends',
		handler: api.getFriends,
		options: {
			auth: false,
			id: 'user.friend.list',
			description: 'User friends getting',
			tags: ['api', 'user'],
			response: {
				schema: outputOkSchema(user.userSchema),
			},
		},
	},
	{
		method: 'POST',
		path: '/user/friend',
		handler: api.addFriend,
		options: {
			id: 'user.friend.add',
			description: 'User friend adding',
			tags: ['api', 'user'],
			validate: {
				payload: user.palUserSchema,
			},
			response: {
				schema: outputOkSchema(user.userSchema),
			},
		},
	},
	{
		method: 'DELETE',
		path: '/user/friend',
		handler: api.deleteFriend,
		options: {
			id: 'user.friend.delete',
			description: 'User friend deleting',
			tags: ['api', 'user'],
			validate: {
				payload: user.palUserSchema,
			},
			response: {
				schema: outputOkSchema(user.userSchema),
			},
		},
	}
];
