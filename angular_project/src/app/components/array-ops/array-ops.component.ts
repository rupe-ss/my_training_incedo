import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-array-ops',
  templateUrl: './array-ops.component.html',
  styleUrls: ['./array-ops.component.css']
})
export class ArrayOpsComponent implements OnInit {

  nums:number[]=[5,8,2,7,1,6,9,3];
  tempNums:number[] = [5,8,2,7,1,6,9,3];

  constructor() { }

  ngOnInit(): void {
  }

  sortAsc(){
    this.nums = this.nums.sort((a,b)=>a-b);
  }

  sortDesc(){
    this.nums = this.nums.sort((a,b)=>b-a);
  }

  filterEven(){
    this.reset();
    this.nums = this.nums.filter(n=>n%2 == 0);
  }

  filterOdd(){
    this.reset();
    this.nums = this.nums.filter(n=>n%2 == 1);
  }

  reset(){
    this.nums = this.tempNums;
  }
}