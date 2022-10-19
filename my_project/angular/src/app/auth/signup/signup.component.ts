import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Costumer } from 'src/app/models/costumer.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  msg: string = '';
  costumer: Costumer;
  constructor(private userService: UserService) {}

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
    });
  }

  onFormSubmit() {
    /* 1. Check if Password Match */
    if (
      !(this.signUpForm.value.password === this.signUpForm.value.repassword)
    ) {
      this.msg = 'Passwords do not Match';
      return;
    }

    /* 2. call API and post this data */
    this.costumer = {
      firstname: this.signUpForm.value.firstname,
      lastname: this.signUpForm.value.lastname,
      city: this.signUpForm.value.city,
      state: this.signUpForm.value.state,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
    };

    this.userService.signUp();
  }
}
