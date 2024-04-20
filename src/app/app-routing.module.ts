import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {CustomersComponent} from "./customers/customers.component";
import {AccountsComponent} from "./accounts/accounts.component";
import {NewCustomersComponent} from "./new-customers/new-customers.component";
import {CustomerAccountComponent} from "./customer-account/customer-account.component";
import {LoginComponent} from "./login/login.component";
import {AdminComponent} from "./admin/admin.component";
import {authenticationGuard} from "./guards/authentication.guard";
import {authorizationGuard} from "./guards/authorization.guard";
import {NotAuthorizationComponent} from "./not-authorization/not-authorization.component";

const routes: Routes = [

  {path : "admin", component:AdminComponent,canActivate : [authenticationGuard],children:[
      {path:"customers", component:CustomersComponent},

      {path:"accounts", component:AccountsComponent},
      {path : "new-customers", component:NewCustomersComponent,canActivate : [authorizationGuard],data :{roles:"ADMIN"}},
      {path : "accounts", component:AccountsComponent},
      {path : "customer_account/:i", component:CustomerAccountComponent},
          {path:"notauthorization", component:NotAuthorizationComponent}
    ]},
  {path:"login", component:LoginComponent},
  {path:"", redirectTo:"/login",pathMatch:"full"},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
