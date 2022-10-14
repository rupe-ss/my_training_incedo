import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { Login } from '../models/login.models';
import { UserInfo } from '../models/user.model';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor() {}

	login(login: Login): Observable<string> {
		let token = btoa(login.email + ':' + login.password);
		return Observable.create((observer) => {
			observer.next(token);
			observer.complete();
		});

		/*
    Call get API for login
    */
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
