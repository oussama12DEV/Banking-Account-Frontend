import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../model/customer.model";

@Component({
  selector: 'app-customer-account',
  templateUrl: './customer-account.component.html',
  styleUrl: './customer-account.component.css'
})
export class CustomerAccountComponent implements OnInit{
  coustomerId!:string;
  customer! : Customer
  constructor(private route:ActivatedRoute,private Roter:Router) {
    this.customer = this.Roter.getCurrentNavigation()?.extras.state as Customer
  }
  ngOnInit(): void {
    this.coustomerId = this.route.snapshot.params['i'];
  }

}
