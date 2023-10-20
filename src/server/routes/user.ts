import { ServerRoute, } from '@hapi/hapi';
import * as api from '../api/user';
import * as user from '../schemas/user';
import { outputOkSchema, } from '../schemas/common';

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
	}
];
