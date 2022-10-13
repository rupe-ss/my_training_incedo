import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserInfo } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  userId: number;
  user: UserInfo;
  msg: string;
  subscription: Subscription[]=[];

  constructor(private actRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.userId = this.actRoute.snapshot.params['id'];
    this.subscription.push(this.userService.getUser(this.userId).subscribe(data=> {
      this.user = data;
    },
    err=>{
      this.msg = "Could not load User Data";
    }))
  }

  ngOnDestroy(): void {
    this.subscription.forEach(subs=> subs.unsubscribe());
  }

}
