import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class SubjectServiceService {

  constructor(public userservice:UserService) { }
  subjectExample = new Subject<any>();
  loadSubjectFromAPI() {
    this.userservice.getSingleUserData(2)
      .subscribe(
        data => this.subjectExample.next({data:data})
      )
    
  }

  getSubject(): Observable<any> {
    console.log("getSubject is working")
      return this.subjectExample.asObservable();
      
  }
}
