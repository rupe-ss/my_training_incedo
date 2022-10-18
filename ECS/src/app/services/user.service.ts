import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee.model';
import { Login } from '../models/login.models';
import { UserInfo } from '../models/user.model';

@Injectable({
	providedIn: 'root',
})
export class UserService {
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
	login(login: Login) {
		return this.http.post<string>(
			environment.serverUrl + '/auth/login',
			login
		);
	}

	getUser(token: string): Observable<UserInfo> {
		let user: UserInfo = {
			name: 'Harry Potter',
			email: 'harry@gmail.com',
			jobTitle: 'Developer',
			managerName: 'Albus Dumledore',
			role: 'MANAGER',
		};
		return Observable.create((observer) => {
			observer.next(user);
			observer.complete();
		});
	}

	signUp(employee: Employee) {
		return Observable.create((observer) => {
			observer.next('');
			observer.complete();
		});
	}
}
