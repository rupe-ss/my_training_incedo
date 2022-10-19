import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  login: Login;
  msg: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    // this.userService.msg$.subscribe((val) => {
    // 	this.msg = val;
    // });
  }

  onFormSubmit() {
    this.login = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    console.log(this.login);

    // this.userService.login(this.login).subscribe({
    // 	next: (data) => {
    // 		localStorage.setItem('token', data);
    // 		this.router.navigateByUrl('/home');
    // 	},
    // 	error: (error) => {
    // 		//this.msg = 'Invalid Credentials';
    // 		console.log(error);
    // 		this.msg = error.error.msg;
    // 	},
    // });
  }
  signupClick() {
    this.router.navigate(['/sign-up']);
  }
}
