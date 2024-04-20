import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomerService} from "../services/customer.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

import {Customer} from "../model/customer.model";
import {catchError, map, Observable, throwError} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit{

  customers!: Observable<Array<Customer>>;
  erromsg!: string ;
    searchcustomers! : FormGroup;

  //constructor(private http: HttpClient) {}

    //je fait ca pour stocker les champs de searchcustomers apres undifiend
    // ky!:FormControl;


  constructor(private customerservice:CustomerService,private  fb : FormBuilder,private router:Router) {}
  ngOnInit(): void {
    //ancien

   /* this.http.get("http://localhost:8085/customers").subscribe(data=>{


      this.customers=data;
    },error => {
      console.log(error)
    })*/

   /* this.http.get("http://localhost:8085/customers").subscribe({
      next : (data)=>{
        this.customers = data;
      },
      error:(err)=>{
        console.log(err)
      }
  })*/



/*this.customerservice.getCustomers().subscribe({next:
        (data)=>{
  this.customers=data;
        },error:(err)=>{
  this.erromsg = err.message;

    }})*/


     this.searchcustomers =  this.fb.group({
          keyword : this.fb.control('')
      })

    // this.ky = this.searchcustomers.get('keyword') as FormControl

    this.customers=this.customerservice.getCustomers().pipe()
      catchError(err => {
        this.erromsg=err;
        return throwError(err)
      })


     //this.searchsCustomers()
}


  searchsCustomers() {
     let  v = this.searchcustomers.value.keyword
      this.customers=this.customerservice.searchCustomers(v).pipe()
      catchError(err => {
          this.erromsg=err;
          return throwError(err)
      })
  }

  deletCustomers(c: Customer) {
      this.customerservice.deletCustozmers(c.id).subscribe({
        next :value => {
       this.customers = this.customers.pipe(map(data=>{
            let index = data.indexOf(c);
            data.slice(index,1)
            return data;
          }))

        },error: err => {
          console.log(err)
        }
      })

  }




  updateCustomers(c: Customer) {

  }

  Customer_account(c: Customer) {
    this.router.navigateByUrl("/customer_account/"+c.id,{state:c})
  }
}
