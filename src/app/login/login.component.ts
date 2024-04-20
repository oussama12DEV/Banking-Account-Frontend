import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  formLogin!: FormGroup;
  constructor(private fb : FormBuilder,public authService : LoginService,private router:Router) {
  }
  ngOnInit(): void {

    this.formLogin=this.fb.group({
      username : this.fb.control(""),
      password : this.fb.control("")
    })
  }

  Authentifie() {
    //console.log(this.formLogin.value);
    let username = this.formLogin.value.username;
    let pwd = this.formLogin.value.password;
    this.authService.login(username,pwd).subscribe({
      next : data=>{
        this.authService.loadProfil(data)
        this.router.navigateByUrl("/admin")
      },
      error : err => {
        console.log(err);
      }
    })
  }

}
