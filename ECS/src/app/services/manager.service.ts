import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee.model';
import { Leave } from '../models/leave.model';
import { Ticket } from '../models/ticket.model';

@Injectable({
	providedIn: 'root',
})
export class ManagerService {
	constructor(private http: HttpClient) {}
	public getEmployeeWithoutAccess(token: string): Observable<Employee[]> {
		const header = { 'x-auth-token': token };
		return this.http.get<Employee[]>(
			environment.serverUrl + '/employee/access',
			{ headers: header }
		);
	}

	public grantAccess(email: string, token: string): Observable<any> {
		const header = { 'x-auth-token': token };
		return this.http.get<any>(
			environment.serverUrl + '/user/grant-access/' + email,
			{ headers: header }
		);
	}

	public fetchLeavesPending(token: string): Observable<Leave[]> {
		const header = { 'x-auth-token': token };
		return this.http.get<Leave[]>(environment.serverUrl + '/leave/all', {
			headers: header,
		});
	}

	public updateLeaveStatus(
		token: string,
		leaveStatus: string,
		leaveID: string,
		eemail: String
	): Observable<any> {
		const header = { 'x-auth-token': token };
		return this.http.get(
			environment.serverUrl +
				'/leave/update-status/' +
				eemail +
				'/' +
				leaveID +
				'/' +
				leaveStatus,
			{ headers: header }
		);
	}

	public fetchTickets(token: string): Observable<Ticket[]> {
		const header = { 'x-auth-token': token };
		return this.http.get<Ticket[]>(environment.serverUrl + '/ticket/all', {
			headers: header,
		});
	}

	public updateResponse(
		token: string,
		id: string,
		response: string
	): Observable<any> {
		const header = { 'x-auth-token': token };
		let tbody = {
			ticketId: id,
			response: response,
		};
		return this.http.put(
			environment.serverUrl + '/ticket/response',
			tbody,
			{ headers: header }
		);
	}

	public getAllEmployees(token: string): Observable<Employee[]> {
		const header = { 'x-auth-token': token };
		return this.http.get<Employee[]>(
			environment.serverUrl + '/employee/all',
			{ headers: header }
		);
	}
}
