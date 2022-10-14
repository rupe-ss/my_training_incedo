import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { leaves } from '../data/data';
import { Leave } from '../models/leave.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor() {}

  applyLeave(leave: Leave): Observable<Leave> {
    return Observable.create((observer) => {
      leave.id = Math.round(Math.random() * 100);
      leave.status = 'PENDING';
      observer.next(leave);
      observer.complete();
    });
  }

  getAllLeaves(): Observable<Leave[]> {
    return Observable.create((observer) => {
      observer.next(leaves);
      observer.complete();
    });
  }
}
