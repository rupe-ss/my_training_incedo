import { Leave } from '../models/leave.model';
import { Manager } from '../models/manager.model';

export const managers: Manager[] = [
  {
    id: 1,
    name: 'Bill Lawry',
    email: 'bill@incedo.com',
    password: 'bill@123',
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
