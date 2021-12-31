import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SubjectServiceService } from '../subject-service.service';
@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  data:any
  singleUserModal: any;
  singleUserData:any
  subjectApiData:any
  
  constructor(public dashboardcomponent:DashboardComponent,public subjectservice:SubjectServiceService) { 
    
    
  }

  ngOnInit(): void {
    this.dashboardcomponent.popUpDataSubject.subscribe((receivedData)=>{
      this.data=receivedData
    })
    

  }
  closeSingleUserViewModal(){
    this.singleUserModal=false
  }
  
}
