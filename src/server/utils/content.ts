import { USER_LIST_LIMIT, } from '../constants';

export function pagination(page: number, size: number) {
	const limit = size ? + size : USER_LIST_LIMIT;
	const offset = page && page > 0 ? (page - 1) * limit : 0;
	return { limit, offset, }
}