import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-stat',
  templateUrl: './user-stat.component.html',
  styleUrls: ['./user-stat.component.css']
})
export class UserStatComponent implements OnInit {

  numUsers: number;
  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.userService.user$.subscribe(data=>{
      this.numUsers = data.length;
    })
    // this.userService.getAllUsers().subscribe(data=> {
    //   this.numUsers = data.length;
    // })
  }

}
