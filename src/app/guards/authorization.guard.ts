import {ActivatedRouteSnapshot, Router, UrlTree} from '@angular/router';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {LoginService} from "../services/login.service";
@ Injectable({
  providedIn : 'root'
})
export class authorizationGuard{

  constructor(private authservice:LoginService,private router : Router) {
  }

  canActivate (
      route: ActivatedRouteSnapshot,
      state : ActivatedRouteSnapshot): boolean {
    if(this.authservice.roles.includes("ADMIN")){
      return true;
    }
    else {
      this.router.navigateByUrl("/admin/notauthorization")
      return false;

    }
  }
}
