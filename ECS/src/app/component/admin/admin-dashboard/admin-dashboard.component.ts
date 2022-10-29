import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';

@Component({
	selector: 'app-admin-dashboard',
	templateUrl: './admin-dashboard.component.html',
	styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
	ngOnInit(): void {}

	employees: Employee[] = [];
	constructor(private http: HttpClient) {}
	//array varibales to store csv data
	lines = []; //for headings
	linesR = []; // for rows

	//File upload function
	changeListener(files: FileList) {
		if (files && files.length > 0) {
			let file: File = files.item(0);

			let reader: FileReader = new FileReader();
			reader.readAsText(file);
			reader.onload = (e) => {
				let csv: any = reader.result;
				let allTextLines = [];
				allTextLines = csv.split(/\r|\n|\r/);

				//Table Headings
				let headers = allTextLines[0].split(';');
				let data = headers;
				let tarr = [];
				for (let j = 0; j < headers.length; j++) {
					tarr.push(data[j]);
				}
				//Pusd headinf to array variable
				this.lines.push(tarr);
				console.log(this.lines);

				// Table Rows
				let tarrR = [];

				//Create formdata object
				var myFormData = new FormData();
				let arrl = allTextLines.length;
				let rows = [];

				for (let i = 1; i < arrl; i++) {
					rows.push(allTextLines[i].split(';'));
					if (allTextLines[i] != '') {
						// Save file data into formdata varibale
						myFormData.append('data' + i, allTextLines[i]);
					}
				}

				for (let j = 0; j < arrl; j++) {
					tarrR.push(rows[j]);
					tarrR = tarrR.filter(function (i) {
						return i != '';
					});
					// Begin assigning parameters
				}
				//Push rows to array variable
				this.linesR.push(tarrR);
				console.log(this.linesR);
				for (let i = 0; i < this.linesR.length; i++) {
					let e = this.linesR[i];
					console.log(e[0][0].split(','));
					console.log('------end---------');
				}
				this.linesR.forEach((e) => {
					let employee: Employee = {
						name: e.name,
						jobTitle: e.jobTitle,
						email: e.email,
						password: e.password,
					};
					console.log(employee);
				});
			};
		}
	}
}
