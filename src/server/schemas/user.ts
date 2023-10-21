import Joi from 'joi';
import { stringSchema, idSchema, emailSchema, } from './common';
import { USER_LIST_LIMIT, } from '../constants';


export const listSchema = Joi.object({
	email: stringSchema,
	page: Joi.number().example(10).label('Page number'),
	size: Joi.number().max(USER_LIST_LIMIT).example(10).label('Limit size on page'),
}).label('Search users');

export const userSchema = Joi.object({
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

export const updateUserSchema = Joi.object({
	firstName: stringSchema,
	lastName: stringSchema,
})

export const palUserSchema = Joi.object({
	id: stringSchema,
})