import { ApplicationInitStatus, Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { catchError } from 'rxjs/operators';
import { NgZone } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';
import { from, Observable, Subject } from 'rxjs';
import { SubjectServiceService}  from '../subject-service.service';
// import {PopUpComponent} from '../pop-up/pop-up.component'
// import { EmailPipePipe} from '../email-pipe.pipe'
declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})



export class DashboardComponent implements OnInit {
  apidata: any
  singleUserdata: any
  singleUserData: any;
  errorObject: any;
  displayPopUp: boolean = false
  displaySingleUserData: boolean = false
  userUpdateResponse: any
  singleUserModal:boolean=false
  updateUserFormdataObject: any
  updateSubmitted:boolean=false
  updateUserForm;
  subjectApiData:any
  popUpDataSubject=new Subject<any>()
   

  display = 'none';
  $: any;
  showModal: boolean = false
  currentUser: any = {}
  constructor(public userService: UserService, public messageService: MessageService, private formBuilder: FormBuilder,public subjectservice:SubjectServiceService) {
    this.updateUserForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z\\s]+$/)]],
      job: ['', [Validators.required]]

    })
    // this.subjectservice.getSubject().subscribe((receivedData)=>{
    //   console.log("is this getting executed")
    //   this.subjectApiData=receivedData
    // })



  }

  

  openModal() {
    // $('#myModal').modal('show');
    this.showModal = true
  }

  closeModal() {
    this.showModal = false
  }

  ngOnInit(): void {
    this.userService.getAllUsersData().subscribe((data: any) => {
      this.apidata = data
      console.log('userService data is here', this.apidata)
      console.log(this.apidata.data[0])
    })


  }
  editUserDetails(id: any) {
    console.log("editing user works")
    this.updateUserFormdataObject = this.updateUserForm.value
    this.userService.updateUserData(id, this.updateUserFormdataObject).subscribe(
      data => {
        console.log("data to be updated is", this.updateUserFormdataObject)
        this.userUpdateResponse = data
      },
      error => {
        this.errorObject = error
        console.log('Error in component: ', error.error.error)
        console.log('Error in this.errorMessage: ', this.errorObject)
      }
    )  
  }

  fetchCurrentUserData(userDataFetched: any) {
    this.currentUser = userDataFetched
    this.updateUserForm.setValue({name:this.currentUser.first_name,job:''})
    this.openModal()
  }

  closeSingleUserViewModal(){
    this.singleUserModal=false
  }

  singleUserDetails(recevivedid: any): void {
    // const id = recevivedid;
    // this.userService.getSingleUserData(id)
    //   .subscribe(
    //     (data) => {
    //       this.singleUserData = data
    //       console.log("single user api works")
    //       console.log(this.singleUserData)
    //       this.singleUserModal=true
    //       console.log(this.singleUserData.data.first_name)
    //     },
    //     error => {
    //       this.errorObject = error
    //       console.log('Error in component: ', error.error.error)
    //       console.log('Error in this.errorMessage: ', this.errorObject)
    //     })
    this.subjectservice.loadSubjectFromAPI()
    this.subjectservice.getSubject().subscribe(data=>
      this.popUpDataSubject.next({data:data})
    )
    this.singleUserModal=true
    
  }
  getSubject(): Observable<any> {
    console.log("getSubject is working")
      return this.popUpDataSubject.asObservable();
      
  }
}



