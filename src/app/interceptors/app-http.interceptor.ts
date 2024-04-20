
import {Injectable} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {LoginService} from "../services/login.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {catchError, throwError} from "rxjs";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private auth: LoginService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler) {
  if(!req.url.includes("/auth/login")){

    let newrequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer '+this.auth.accesToken)
    })
    return next.handle(newrequest).pipe(catchError(err => {
      if(err.status==401){
        this.auth.logout();
      }

        return throwError(err.message())

    })); }
  else {
    return next.handle(req);
  }
  }
}
