import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AccountsComponent } from './accounts/accounts.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NewCustomersComponent } from './new-customers/new-customers.component';
import { CustomerAccountComponent } from './customer-account/customer-account.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import {AppHttpInterceptor} from "./interceptors/app-http.interceptor";
import { NotAuthorizationComponent } from './not-authorization/not-authorization.component';



@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    NavbarComponent,
    AccountsComponent,
    NewCustomersComponent,
    CustomerAccountComponent,
    LoginComponent,
    AdminComponent,
    NotAuthorizationComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
      FormsModule

  ],
  providers: [
    {provide : HTTP_INTERCEPTORS,useClass :AppHttpInterceptor,multi :true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
