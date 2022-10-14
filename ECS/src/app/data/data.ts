import { AccessRequest } from '../models/accessRequest.model';
import { Leave } from '../models/leave.model';
import { LeaveRequest } from '../models/leaveRequest.model';
import { Manager } from '../models/manager.model';

export const managers: Manager[] = [
	{
		id: '1',
		name: 'Bill Lawry',
		email: 'bill@incedo.com',
		password: 'bill@123',
	},
	{
		id: '2',
		name: 'Tony Fraser',
		email: 'tony@incedo.com',
		password: 'tony@123',
	},
	{
		id: '3',
		name: 'Adam Sterling',
		email: 'adam@incedo.com',
		password: 'adam@123',
	},
];

export const priority: string[] = ['RED', 'BLUE', 'GREEN'];

export const leaves: Leave[] = [
	{
		id: 1,
		to: '10-20-2022',
		from: '10-25-2022',
		email: 'harry@gmail.com',
		year: 2022,
		numDays: 5,
		status: 'CONFIRMED',
	},
	{
		id: 2,
		to: '11-20-2022',
		from: '11-25-2022',
		email: 'harry@gmail.com',
		year: 2022,
		numDays: 5,
		status: 'CONFIRMED',
	},
];

export const leaveRequests: LeaveRequest[] = [
	{
		id: 111,
		name: 'John Doe',
		email: 'john@incedo.com',
		noOfDays: 2,
		from: '12-11-2022',
		to: '12-12-2022',
		status: 'PENDING',
	},
	{
		id: 222,
		name: 'Mary Jane',
		email: 'mary@incedo.com',
		noOfDays: 3,
		from: '11-15-2022',
		to: '11-17-2022',
		status: 'PENDING',
	},
];

export const accessRequests: AccessRequest[] = [
	{
		id: 123,
		name: 'Ryan Snow',
		email: 'ryan@incedo.com',
		jobTitle: 'Developer',
		status: 'PENDING',
	},
	{
		id: 456,
		name: 'Cole Nichol',
		email: 'cole@incedo.com',
		jobTitle: 'Tester',
		status: 'PENDING',
	},
];
