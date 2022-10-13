import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {
  x:number=20;
  y:number=10;

  result:number;
  constructor() { }

  ngOnInit(): void {
  }

  calc(op:string){
    switch(op){
      case 'add':
        this.result=this.x+this.y;
        break;
      case 'sub':
        this.result=this.x-this.y;
        break;
    }
  }

}