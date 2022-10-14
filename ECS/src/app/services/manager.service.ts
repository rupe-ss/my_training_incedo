import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { leaveRequests } from '../data/data';

@Injectable({
	providedIn: 'root',
})
export class ManagerService {
	constructor() {}

	getAllLeaveRequests() {
		return Observable.create((observer) => {
			observer.next(leaveRequests);
			observer.complete();
		});
	}
}
