import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GreetingsComponent } from './components/greetings/greetings.component';
import { CalcComponent } from './components/calc/calc.component';
import { ArrayOpsComponent } from './components/array-ops/array-ops.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { PostStatComponent } from './components/post-stat/post-stat.component';
import { PostComponent } from './components/post/post.component';
import { TodoStatComponent } from './components/todo-stat/todo-stat.component';
import { UserStatComponent } from './components/user-stat/user-stat.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { CommentsComponent } from './components/comments/comments.component';
import { TodoComponent } from './components/todo/todo.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsersComponent } from './components/users/users.component';
import { PostAddComponent } from './components/post-add/post-add.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component'

@NgModule({
  declarations: [
    AppComponent,
    GreetingsComponent,
    CalcComponent,
    ArrayOpsComponent,
    EmployeeComponent,
    PostStatComponent,
    PostComponent,
    TodoStatComponent,
    UserStatComponent,
    HomeComponent,
    UserComponent,
    CommentsComponent,
    TodoComponent,
    NavbarComponent,
    UsersComponent,
    PostAddComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, //This is got ngFor and ng
    HttpClientModule, //This is for http call
    ReactiveFormsModule //This import is for reactive form module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
