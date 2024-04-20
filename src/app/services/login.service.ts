import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {jwtDecode} from "jwt-decode";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isAuthenticated : boolean=false;
  username : any;
  roles : any;
  accesToken!:any;
  constructor(private  http:HttpClient,private router : Router) { }
  public login(username :string,password:string){
    let options = {
      headers : new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
    }
    let parmes = new HttpParams().set("username",username).set("password",password)
    return this.http.post("http://localhost:8085/auth/login",parmes,options)
  }

  loadProfil(data: any) {
      this.isAuthenticated=true;
      this.accesToken= data['accesToken'];
      let decodejwt:any =jwtDecode(this.accesToken);
      this.username =decodejwt.sub;
      this.roles =decodejwt.scope;
      window.localStorage.setItem("jwt-token",this.accesToken);

  }

  logout() {
    this.isAuthenticated=false;
    this.username=undefined;
    this.accesToken=undefined;
    this.roles=undefined;
    this.router.navigateByUrl("/login");
    window.localStorage.removeItem("jwt-token");
  }

  loadJwtFromlocalStorage() {
    let token = window.localStorage.getItem("jwt-token")
    if(token){
      this.loadProfil({"accesToken":token});
      this.router.navigateByUrl("/admin/customers");
    }
  }
}
