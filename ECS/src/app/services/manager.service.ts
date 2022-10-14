import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { accessRequests, leaveRequests } from '../data/data';
import { AccessRequest } from '../models/accessRequest.model';
import { LeaveRequest } from '../models/leaveRequest.model';

@Injectable({
	providedIn: 'root',
})
export class ManagerService {
	constructor() {}

	getAllLeaveRequests(): Observable<LeaveRequest[]> {
		return Observable.create((observer) => {
			observer.next(leaveRequests);
			observer.complete();
		});
	}

	getAllAccessRequests(): Observable<AccessRequest[]> {
		return Observable.create((observer) => {
			observer.next(accessRequests);
			observer.complete();
		});
	}

	confirmRequest(requestId: number, decision: string) {
		return Observable.create((observer) => {
			observer.next(leaveRequests);
			observer.complete();
		});
	}
}
