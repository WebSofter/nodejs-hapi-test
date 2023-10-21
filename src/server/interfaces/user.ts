export interface IUser {
	id: string,
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
export interface IUpdateCredentials {
	firstName: string;
	lastName: string;
}