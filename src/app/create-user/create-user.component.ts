import { ApplicationInitStatus, Component, OnInit } from '@angular/core';
import { FormBuilder, MaxValidator, Validators } from '@angular/forms';
import { FormGroup, FormControl }  from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { UserService } from '../user.service';
import { NgZone } from '@angular/core';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})

export class CreateUserComponent implements OnInit {
 createUserForm;
 email:any 
 password:any
 formdata:any
 errorResponse:any
 errorResponseStatus:any
 isSuccess:boolean=false
 successDataReceived:any
 isFailure:boolean=false
 myUser={"name":"myName"}
 errorMessage: string | undefined
  constructor(private formBuilder: FormBuilder,public userservice:UserService,private zone: NgZone) { 
    this.createUserForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(15),Validators.minLength(2)]]
    
    })
   }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log("form works")
    this.formdata=this.createUserForm.value
    this.userservice.registerUser(this.formdata)
      .subscribe((data) => {
          console.log('Data in component:', data)
          this.errorMessage = undefined
          this.isSuccess=true
          this.isFailure=false
          this.successDataReceived=data          
        },
        (error) => {
          this.errorMessage = error
          this.errorResponse=error.error
          this.errorResponseStatus=error.status
          console.log('Error in component: ', error.error)
          console.log('Error in this.errorMessage: ', this.errorMessage)
          console.log("status is",  error.status)
          this.isFailure=true
          this.isSuccess=false
          this.zone.runOutsideAngular(() => {setTimeout(() => {
            this.isFailure = false
          }, 5000)});
        }
      )
  }
}
