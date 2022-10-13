import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn() {
    let token = localStorage.getItem('token');
    console.log(token);

    if(token == undefined || token == null)
      return false;

    return true;
  }
}
