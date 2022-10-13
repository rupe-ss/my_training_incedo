import { Component, OnInit } from '@angular/core';
import { employees } from 'src/app/data/data';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employee1:Employee;
  employee2:Employee;
  employee3:Employee;
  employees:Employee[];
  city:string='';
  tempEmployees:Employee[];

  constructor() {
    this.employees=employees;
    this.tempEmployees = employees;
  }

  ngOnInit(): void {
  }


  filterEmployee(){
    this.employees = this.tempEmployees;
    if( !(this.city == '' || this.city == undefined) ){
      this.employees = this.employees
              .filter(e=>e.city === this.city);
    }
  }


}