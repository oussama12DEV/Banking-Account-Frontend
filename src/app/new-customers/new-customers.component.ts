import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../services/customer.service";
import {Customer} from "../model/customer.model";

@Component({
  selector: 'app-new-customers',
  templateUrl: './new-customers.component.html',
  styleUrl: './new-customers.component.css'
})
export class NewCustomersComponent implements OnInit{
  addcustomersformgroupe! : FormGroup

  constructor(private fb : FormBuilder,private service :CustomerService) {
  }
  ngOnInit(): void {

    this.addcustomersformgroupe = this.fb.group({
      nom: this.fb.control('',[Validators.required,Validators.minLength(4)]),
      gmail : this.fb.control('',[Validators.required,Validators.email])
    })
  }

  saveCustomers() {
  let custome:Customer = this.addcustomersformgroupe.value
    this.service.SaveCustomers(custome).subscribe({
      next : data=>{
        alert("Customers Has Been Successuflly Saved !")
      },
      error : err => {
        console.log(err)
      }
    })

  }
}
