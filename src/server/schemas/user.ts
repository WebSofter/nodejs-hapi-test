import Joi from 'joi';
import { stringSchema, idSchema, emailSchema, } from './common';
import { USER_LIST_LIMIT, } from '../constants';


export const userListQuerySchema = Joi.object({
	email: stringSchema.label('Email substring for search'),
	page: Joi.number().example(10).label('Page number'),
	size: Joi.number().max(USER_LIST_LIMIT).example(10).label('Limit size on page'),
}).label('Search users');

export const userSingleSchema = Joi.object({
	id: idSchema.label('User id'),
	email: emailSchema,
	phone: stringSchema,
	status: stringSchema,
	firstName: stringSchema,
	lastName: stringSchema,
	createdAt: stringSchema,
	updatedAt: stringSchema,
	deletedAt: stringSchema,
})

export const userListSchema = userSingleSchema

export const userUpdateSchema = Joi.object({
	firstName: stringSchema,
	lastName: stringSchema,
})

export const userFriendSchema = Joi.object({
	id: stringSchema,
})