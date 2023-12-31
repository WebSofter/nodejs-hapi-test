import Joi from 'joi';
import { stringSchema, idSchema, emailSchema, } from './common';
import { POST_LIST_LIMIT, } from '../constants';
import { userSingleSchema, } from './user';


export const postSearchSchema = Joi.object({
	keyword: stringSchema,
	page: Joi.number().example(10).label('Page number'),
	size: Joi.number().max(POST_LIST_LIMIT).example(10).label('Limit size on page'),
}).label('Search posts');

export const postSingleSchema = Joi.object({
	id: idSchema.label('Post id'),
	email: emailSchema,
	phone: stringSchema,
	status: stringSchema,
	firstName: stringSchema,
	lastName: stringSchema,
	createdAt: stringSchema,
	updatedAt: stringSchema,
	deletedAt: stringSchema,
})


export const postListSchema = postSingleSchema.keys({
	user: userSingleSchema,
});

export const postQueryUpdateSchema = Joi.object({
	title: stringSchema,
	content: stringSchema,
})

export const postQueryCreateSchema = postQueryUpdateSchema