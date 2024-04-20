import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../model/customer.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
    BackEnd:string= "http://localhost:8085";

  constructor(private http: HttpClient) { }

  public getCustomers(): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(this.BackEnd+"/customers");
  }
  public searchCustomers(keyword : string): Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(this.BackEnd+"/customers/search?keyword="+keyword)
  }
  public SaveCustomers(customer : Customer): Observable<Customer>{
    return this.http.post<Customer>(this.BackEnd+"/customers",customer)
  }
  public deletCustozmers(id : number){
    return this.http.delete(this.BackEnd+"/customers/"+id);
  }
  public UpdateCustomers(customer : Customer): Observable<Customer>{
    return this.http.post<Customer>(this.BackEnd+"/customers",customer.id)
  }
}
