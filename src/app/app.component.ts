import {Component, OnInit} from '@angular/core';
import {initFlowbite} from "flowbite";
import {LoginService} from "./services/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(private authservice:LoginService) {
  }
  ngOnInit(): void {
    this.authservice.loadJwtFromlocalStorage();
  }


}
