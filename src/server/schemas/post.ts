import Joi from 'joi';
import { stringSchema, idSchema, emailSchema, } from './common';
import { POST_LIST_LIMIT, } from '../constants';


export const listSchema = Joi.object({
	email: stringSchema,
	page: Joi.number().example(10).label('Page number'),
	size: Joi.number().max(POST_LIST_LIMIT).example(10).label('Limit size on page'),
}).label('Search posts');

export const postSchema = Joi.object({
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

export const updatePostSchema = Joi.object({
	title: stringSchema,
	content: stringSchema,
})

export const createPostSchema = Joi.object({
	title: stringSchema,
	content: stringSchema,
})