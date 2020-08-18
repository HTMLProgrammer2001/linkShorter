export type ILink = {
	_id: string,
	from: string,
	to: string,
	code: string,
	date: Date,
	owner: number,
	visitions: Array<{date: Date, ip: string}>
};
