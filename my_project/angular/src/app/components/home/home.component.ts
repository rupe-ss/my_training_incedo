import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: User;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUser(localStorage.getItem('token')).subscribe({
      next: (data) => {
        this.user = data;
        if (this.user.role === undefined) {
          this.router.navigateByUrl('/costumer');
        } else this.router.navigateByUrl('/employee');
      },
      error: (error) => {
        this.userService.msg$.next(error.error.msg);
        this.router.navigateByUrl('/');
      },
    });
  }
}
