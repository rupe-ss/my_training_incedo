import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AccessRequest } from 'src/app/models/accessRequest.model';
import { LeaveRequest } from 'src/app/models/leaveRequest.model';
import { Manager } from 'src/app/models/manager.model';
import { ManagerService } from 'src/app/services/manager.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-manager',
	templateUrl: './manager.component.html',
	styleUrls: ['./manager.component.css'],
})
export class ManagerComponent implements OnInit, OnDestroy {
	leaveMsg: string = '';
	leaveEmptymsg: string = '';
	requestMsg: string = '';
	requestEmptymsg: string = '';
	requestEmail: string;
	ticketForm: FormGroup;
	manager: Manager;
	leaveRequests: LeaveRequest[];
	accessRequests: AccessRequest[];
	leaveRequestMsg: string = '';
	subscription: Subscription[] = [];

	constructor(
		private userService: UserService,
		private managerService: ManagerService
	) {}
	ngOnDestroy(): void {
		this.subscription.forEach((subs) => subs.unsubscribe);
		console.log('Manager Component destroyed.');
		localStorage.removeItem('token');
	}

	ngOnInit(): void {
		this.userService.getUser(localStorage.getItem('token')).subscribe({
			next: (data) => {
				this.manager = {
					name: data.name,
					email: data.email,
				};
			},
			error: () => {},
		});

		this.managerService.getAllLeaveRequests().subscribe({
			next: (data) => {
				this.leaveRequests = data;
			},
			error: (err) => {
				this.leaveRequestMsg = 'Could not load leave requests.';
			},
		});

		this.managerService.getAllAccessRequests().subscribe({
			next: (data) => {
				this.accessRequests = data;
			},
			error: (err) => {
				this.requestMsg = 'Could not load leave requests.';
			},
		});
	}

	requestDecision(requestId: number, decision: string) {
		this.managerService.confirmRequest(requestId, decision).subscribe({
			next: (data) => {
				this.leaveRequests = this.leaveRequests.filter(
					(request) => request.id != requestId
				);
				decision === 'confirm'
					? (this.leaveMsg = 'Request CONFIRMED')
					: (this.leaveMsg = 'Request DENY');

				if (this.leaveRequests.length == 0) {
					this.leaveEmptymsg = 'No more Requests';
					this.leaveMsg = '';
				}
			},
			error: (err) => {
				this.leaveMsg = 'Something went wrong';
			},
		});
	}
}
