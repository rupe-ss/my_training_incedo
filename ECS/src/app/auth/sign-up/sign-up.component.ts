import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Manager } from 'src/app/models/manager.model';
import { managers } from 'src/app/data/data';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  jobTitles: string[] = ['Developer', 'Manager', 'Product Owner', 'Scrum Master', 'Devops Engineer'];
  managers: Manager[] = managers;

  constructor() { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]$/)]),
      jobTitle: new FormControl('', Validators.required),
      manager: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      repassword: new FormControl('', Validators.required),
    })
  }

  onFormSubmit(){
     /*1. Check if Password Match */
  }

}
