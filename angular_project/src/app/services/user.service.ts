import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { UserInfo } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  user$ = new BehaviorSubject<UserInfo[]>([]);
  //Normal string
  name$ = new BehaviorSubject<string>('');
  employee$ = new BehaviorSubject<Employee>({})

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserInfo[]> {
     return this.http.get<UserInfo[]>('https://jsonplaceholder.typicode.com/users');
  }

  getUser(userId: number): Observable<UserInfo> {
    return this.http.get<UserInfo>('https://jsonplaceholder.typicode.com/users/' + userId)
  }

}
