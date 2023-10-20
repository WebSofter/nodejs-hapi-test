export interface IUser {
	id: number,
	firstName?: string;
	lastName?: string;
	email: string,
}
export interface IUserListCredentials {
	email?: string;
	page?: number;
	size?: number;
}
export interface IUserCredentials {
	id: string;
}