import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { HomeComponent } from './component/home/home.component';
import { EmployeeComponent } from './component/employee/employee.component';
import { ManagerComponent } from './component/manager/manager.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { InfoComponent } from './component/employee/info/info.component';
import { LeaveComponent } from './component/employee/leave/leave.component';
import { ListComponent } from './component/employee/list/list.component';
import { TicketComponent } from './component/employee/ticket/ticket.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		SignUpComponent,
		HomeComponent,
		EmployeeComponent,
		ManagerComponent,
		PageNotFoundComponent,
  InfoComponent,
  LeaveComponent,
  ListComponent,
  TicketComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
