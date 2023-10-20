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
			auth: false,
			id: 'user.update',
			description: 'Update user',
			tags: ['api', 'user'],
			validate: {
				// payload: user.updateUserSchema,
			},
			response: {
				schema: outputEmptySchema(),
			},
		},
	}
];
