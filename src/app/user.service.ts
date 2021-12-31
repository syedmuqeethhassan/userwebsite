import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateUserComponent } from './create-user/create-user.component';
import { catchError, map } from 'rxjs/operators'
import { throwError } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class UserService {
  errormessage: any
  status: any
  failure: boolean = false
  success: boolean = false
  failureEmail: boolean = false
  failurePassword: boolean = false
  userId: any
  allUsersData:any
  subjectExample = new Subject<any>();
  baseLink: any = 'https://reqres.in/api/'

  constructor(private http: HttpClient) {
   
  }

  

 

  getAllUsersData() {
    // this.allUsersData=this.http.get('https://reqres.in/api/users?page=1&delay=5')
    // return this.allUsersData
    return this.http.get('https://reqres.in/api/users?page=1')
  }

  registerUser(formdata: any) {
    // let sendingData=formdata
    let apiLink = this.baseLink + 'register'
    return this.http.post<any>(apiLink, formdata)
      .pipe(
        // map(data => data),
        catchError(this.processError)

      )


  }
  getSingleUserData(id: any) {
    this.userId = id
    let apiLink = this.baseLink + 'users/'
    let endPoints = apiLink + id;
    return this.http.get(endPoints)
      .pipe(
        // map(data => data),
        catchError(this.processError)

      )
  }

  updateUserData(id: any, userUpdatedata: any) {
    this.userId = id
    let apiLink = this.baseLink + 'users/'
    let userData = userUpdatedata
    let endPoints = apiLink + id;
    return this.http.put<any>(endPoints, userData)
      .pipe(
        // map(data => data),
        catchError(this.processError)
      )
  }

  processError(err: any) {
    console.log(err, 'err')
    let message = 'err.error';
    let status = 'err.status';
    if (err.error instanceof ErrorEvent) {
      message = err.error.error;
      status = err.error.status
    } else {
      message = `Error Code: ${err.status}\nMessage: ${err.error}`;
    }
    console.log(" this is the message", message);
    return throwError(err.error);
  }
}
// getAllUsersData(){
//   return this.http.get('https://reqres.in/api/users?page=1&delay=5')
// }