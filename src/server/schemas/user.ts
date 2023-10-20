import Joi from 'joi';
import { stringSchema, } from './common';
import { USER_LIST_LIMIT, } from '../constants';


export const listSchema = Joi.object({
	email: stringSchema,
	page: Joi.number().example(10).label('Page number'),
	size: Joi.number().max(USER_LIST_LIMIT).example(10).label('Limit size on page'),
}).label('Search users');