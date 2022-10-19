import { Component, Input, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';

@Component({
	selector: 'app-employee-info',
	templateUrl: './info.component.html',
	styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
	@Input('employee')
	employee: Employee;

	constructor() {}

	ngOnInit(): void {}
}
