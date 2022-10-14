import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  login: Login;
  msg: string;

  constructor(private loginService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  onFormSubmit() {
    this.login = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }

    this.loginService.login(this.login).subscribe({
      next: (data) => {
        localStorage.setItem('token', data);
        this.router.navigateByUrl('/home');
      },
      error: (error)=> {
        this.msg = 'Invalid Credentials';
      }
    });
  }

}