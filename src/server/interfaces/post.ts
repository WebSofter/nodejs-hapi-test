export interface IPost {
	id: number,
	title?: string;
	content?: string;
	status: string,
}
export interface IPostListCredentials {
	keyword?: string;
	page?: number;
	size?: number;
}
export interface IPostCredentials {
	id: string;
}
export interface IPostUpdateCredentials {
	title: string;
	content: string;
}