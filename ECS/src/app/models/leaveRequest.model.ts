export class LeaveRequest {
	id?: number;
	name: string;
	email?: string;
	noOfDays: number;
	from: string | Date;
	to: string | Date;
}
