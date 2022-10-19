import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	status$ = new BehaviorSubject<boolean>(false);
	constructor(private userService: UserService, private router: Router) {}

	islogged(): boolean {
		/*1. Is the token available in local storage */
		let token = localStorage.getItem('token');
		let status = false;
		if (!token) this.router.navigateByUrl('/');
		if (token) {
			/*2. Is token valid at this point */
			this.status$.subscribe({
				next: (data) => {
					status = data;
					return status;
				},
			});
		}
		return status;
	}
}
