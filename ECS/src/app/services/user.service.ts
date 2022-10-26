import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee.model';
import { Login } from '../models/login.models';
import { Manager } from '../models/manager.model';
import { UserInfo } from '../models/user.model';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	msg$ = new BehaviorSubject<string>('');
	constructor(private http: HttpClient) {}

	/*This will call API to get a token based on email and password */
	// login(login: Login): Observable<string> {
	// 	let token = btoa(login.email + ':' + login.password);
	// 	return Observable.create((observer) => {
	// 		observer.next(token);
	// 		observer.complete();
	// 	});

	// 	/*
	// Call get API for login
	// */
	// }
	public login(login: Login) {
		const token = window.btoa(login.email + ':' + login.password);
		const header = { Authorization: 'Basic ' + token };
		return this.http.get<string>(environment.serverUrl + '/auth/login', {
			headers: header,
		});
	}

	getUser(token: string): Observable<UserInfo> {
		// let user: UserInfo = {
		// 	name: 'Harry Potter',
		// 	email: 'harry@gmail.com',
		// 	jobTitle: 'Developer',
		// 	managerName: 'Albus Dumledore',
		// 	role: 'MANAGER',
		// };
		const header = {
			Authorization: 'Basic ' + token,
		};
		this.http
			.get<UserInfo>(environment.serverUrl + '/auth/user', {
				headers: header,
			})
			.subscribe((data) => {});
		return this.http.get<UserInfo>(environment.serverUrl + '/auth/user', {
			headers: header,
		});
	}

	// signUp(employee: Employee) {
	// 	return Observable.create((observer) => {
	// 		observer.next('');
	// 		observer.complete();
	// 	});
	// }
	public signUp(employee: Employee): Observable<any> {
		return this.http.post<any>(
			environment.serverUrl + '/employee/add',
			employee
		);
	}

	public getAllManagers(): Observable<Manager[]> {
		return this.http.get<Manager[]>(environment.serverUrl + '/manager/all');
	}
}
