import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  msg$ = new BehaviorSubject<string>('');
  constructor(private http: HttpClient) {}

  public signup(user: User): Observable<any> {
    return this.http.post<any>(environment.serverUrl + '/user/add', user);
  }

  public login(login: Login): Observable<string> {
    return this.http.post<string>(environment.serverUrl + '/auth/login', login);
  }

  public getUser(token: string) {
    const header = { 'x-auth-token': token };
    return this.http.get<User>(environment.serverUrl + '/auth/user', {
      headers: header,
    });
  }
}
