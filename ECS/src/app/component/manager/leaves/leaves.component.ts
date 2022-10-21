import { Component, Input, OnInit } from '@angular/core';
import { Leave } from 'src/app/models/leave.model';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
	selector: 'app-manager-leaves',
	templateUrl: './leaves.component.html',
	styleUrls: ['./leaves.component.css'],
})
export class ManagerLeavesComponent implements OnInit {
	@Input('leaves')
	leaves: Leave[] = [];
	showCommentBox: boolean = false;
	tempLeaves: Leave[] = [];
	constructor(private managerService: ManagerService) {}

	ngOnInit(): void {}

	onLeaveClick(leaveStatus: string, leaveID: string, eemail: String) {
		this.managerService
			.updateLeaveStatus(
				localStorage.getItem('token'),
				leaveStatus,
				leaveID,
				eemail
			)
			.subscribe({
				next: (data) => {
					if (leaveStatus === 'APPROVED') {
						this.leaves = this.leaves.filter(
							(l) => l._id !== leaveID
						);
						this.leaves.forEach((l) => {
							if (l.email === eemail && l._id === leaveID) {
								l.leavesLeft = l.leavesLeft - l.days;
								this.tempLeaves.push(l);
							} else {
								this.tempLeaves.push(l);
							}
						});
						this.leaves = this.tempLeaves;
					} else if (leaveStatus === 'DENIED') {
						this.showCommentBox = true;
					}
				},
				error: () => {},
			});
	}
}
