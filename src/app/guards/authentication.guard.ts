import {ActivatedRouteSnapshot, Router, UrlTree} from '@angular/router';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {LoginService} from "../services/login.service";
@ Injectable({
  providedIn : 'root'
})
export class authenticationGuard{

  constructor(private authservice:LoginService,private router : Router) {
  }

  canActivate (
    route: ActivatedRouteSnapshot,
    state : ActivatedRouteSnapshot): boolean {
    if(this.authservice.isAuthenticated==true){
      return true;
    }
    else {
   this.router.navigateByUrl("/login")
  return false;

    }
}
}
