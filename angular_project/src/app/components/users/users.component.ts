import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users:UserInfo[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data=> {
      this.users = data;
      this.userService.user$.next(data);
    });
  }

  deleteUser(userId: number){
    this.users = this.users.filter(u=> u.id != userId);
    this.userService.user$.next(this.users);
  }

}
