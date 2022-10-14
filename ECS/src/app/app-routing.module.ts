import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { EmployeeComponent } from './component/employee/employee.component';
import { ManagerComponent } from './component/manager/manager.component';
import { AuthGuardService } from './services/auth-guard.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
	{ path: '', component: LoginComponent },
	{ path: 'sign-up', component: SignUpComponent },
	{ path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
	{
		path: 'employee',
		component: EmployeeComponent,
		canActivate: [AuthGuardService],
	},
	{
		path: 'manager',
		component: ManagerComponent,
		canActivate: [AuthGuardService],
	},
	{ path: '**', component: PageNotFoundComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
