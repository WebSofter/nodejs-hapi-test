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
				query: user.userListQuerySchema,
			},
			response: {
				schema: outputOkSchema(user.userListSchema),
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
				schema: outputOkSchema(user.userSingleSchema),
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
				payload: user.userUpdateSchema,
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
				schema: outputOkSchema(user.userSingleSchema),
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
				schema: outputOkSchema(user.userFriendListSchema),
			},
		},
	},
	{
		method: 'GET',
		path: '/user/{id}/friend/stat',
		handler: api.getFriendsStat,
		options: {
			auth: false,
			id: 'user.friend.stat',
			description: 'User friends statistic',
			tags: ['api', 'user'],
			response: {
				schema: outputOkSchema(user.userFriendStatSchema),
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
				payload: user.userFriendSchema,
			},
			response: {
				schema: outputEmptySchema(),
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
				payload: user.userFriendSchema,
			},
			response: {
				schema: outputEmptySchema(),
			},
		},
	}
];
