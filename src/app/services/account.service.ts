import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {AccountDetails} from "../model/account.model";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  BackEnd:string= "http://localhost:8085";

  constructor(private http: HttpClient){ }
  public getAccountId( accountid: string,page : number,size : number):Observable<AccountDetails>{
    return this.http.get<AccountDetails>(this.BackEnd+"/accounts/"+accountid+"/PageOperation?page="+page+"&size="+size)
  }
  public debit(acountid:string,mount:number,description:string){
    let data={acountid :acountid,mount:mount,description:description};
    return this.http.post(this.BackEnd+"/accounts/debit",data)
  }
  public credit(accccountId:string,mount:number,description:string){
    let data={accccountId,mount,description};
    return this.http.post(this.BackEnd+"/accounts/credit",data)
  }
  public transfer(acountIdSource:string,acountIdDestination:string,mount:number){
    let data={acountIdSource,acountIdDestination,mount};
    return this.http.post(this.BackEnd+"/accounts/transfer",data)
  }
}
