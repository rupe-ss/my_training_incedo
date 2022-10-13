import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-greetings',
  templateUrl: './greetings.component.html',
  styleUrls: ['./greetings.component.css']
})
export class GreetingsComponent implements OnInit {

  msg:string; //undefined

  constructor() { }

  ngOnInit(): void {
  }

  welcomeFunc(){
    this.msg='Hey Welcome to angular';
  }

  taskFunc(){
    this.msg="work with typescript";
  }
}