import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AccountDetails} from "../model/account.model";
import {Observable} from "rxjs";
import {AccountService} from "../services/account.service";
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements  OnInit{
    accountform! : FormGroup;
  accountDetailsObservable! : Observable<AccountDetails>;
  currentpage : number=0;
  pagesize : number=5;
  accountFormGroup! :FormGroup;

//ky! : FormControl

  constructor(private fb:FormBuilder,private account : AccountService,public loginservice:LoginService) {
  }
  ngOnInit(): void {
    this.accountform = this.fb.group({
        acountid : this.fb.control('')

    });
    this.accountFormGroup=this.fb.group({
        TypeOperation : this.fb.control(''),
        mount : this.fb.control(0),
        description : this.fb.control(''),
        AccountDestination : this.fb.control(''),
        acountid : this.fb.control(''),

    })

    //  this.ky = this.accountform.get('acountid') as FormControl;
  }

  searchaccounts() {
    let x :string = this.accountform.value.acountid
    this.accountDetailsObservable = this.account.getAccountId(x,this.currentpage,this.pagesize)
  }

  nextpage(page: number) {
      this.currentpage = page;
      this.searchaccounts()
  }
  accountOpperation() {

      //let nn: string = this.accountform.get('acountid')?.value;
      let acountid : string = this.accountform.value.acountid;

      let mount : number=this.accountFormGroup.value.mount;
      let type : string = this.accountFormGroup.value.TypeOperation;
    let description : string = this.accountFormGroup.value.description;
    let accountDestination : string = this.accountFormGroup.value.AccountDestination;


    if(type=="debit"){

      this.account.debit(acountid,mount,description).subscribe({
        next:(data)=>{

          alert("Debit passe avec success");
          this.accountFormGroup.reset();
          this.searchaccounts();
        },error:(err) => {
          console.log(err)
          }
      });
    }

    else if(type=="credit"){
      this.account.credit(acountid,mount,description).subscribe({
        next:data=>{
          alert("credit passe avec success");
          this.accountFormGroup.reset();
          this.searchaccounts();
        }
      });
    }
    else if(type=="transfer"){
      this.account.transfer(acountid,accountDestination,mount).subscribe({
        next:data=>{
          alert("Transfer passe avec success");
          this.accountFormGroup.reset();
          this.searchaccounts();
        }
      });
    }

  }
}
