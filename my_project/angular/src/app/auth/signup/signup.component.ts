import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  user: User;
  states: string[] = [
    'Ohio',
    'Kentucky',
    'New york',
    'Maine',
    'New Hampshire',
    'Vermont',
    'Massachusetts',
    'Rhode Island',
    'Connecticut',
    'Delaware',
  ];
  cities: string[] = [
    'New York',
    'Portland',
    'Pittsburgh',
    'Williamstown',
    'New Haven',
  ];
  msg: string = '';
  subscription: Subscription;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      firstname: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]+$/),
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]+$/),
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]+$/),
      ]),
      state: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]+$/),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(/^[a-zA-Z0-9 _#]+$/),
      ]),
      repassword: new FormControl('', Validators.required),
      isEmployee: new FormControl(''),
    });
  }

  onFormSubmit() {
    /* 1. Check if Password Match */
    if (
      !(this.signUpForm.value.password === this.signUpForm.value.repassword)
    ) {
      this.msg = 'Passwords do not Match';
      console.log(this.msg);
      return;
    }

    let role = '';
    if (this.signUpForm.value.isEmployee) role = 'EMPLOYEE';
    else role = 'COSTUMER';

    /* 2. call API and post this data */
    this.user = {
      firstname: this.signUpForm.value.firstname,
      lastname: this.signUpForm.value.lastname,
      state: this.signUpForm.value.state,
      city: this.signUpForm.value.city,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      role: role,
    };
    this.userService.signup(this.user).subscribe({
      next: (data) => {
        this.userService.msg$.next('SignUp Success');
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        this.msg = error.error.msg;
      },
    });
  }
}
