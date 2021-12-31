import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateUserComponent } from './create-user/create-user.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {  UserService } from './user.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { from, Subject } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { EmailPipePipe } from './email-pipe.pipe';
import { PopUpComponent } from './pop-up/pop-up.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CreateUserComponent,
    EmailPipePipe,
    PopUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastModule
  ],
  providers: [UserService,MessageService,PopUpComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
