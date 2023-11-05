import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable, exhaustMap, take } from "rxjs";

@Injectable()

export class  AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //take only one subject and then unsubscribe
        //exhaustMap will wait for the first observer to completed and we will get value as the user is behavior subject first value will be null
        //after the first observer cis completed it execute the second observer 

        return this.authService.user.pipe(      //first observer [behavior subject user]
            take(1),                            //unsubscribe to user observable
            exhaustMap((user:any)=>{            //when first observer is complete and it is replaced by second observer that we return inside this function
                if(!user.token){
                    return next.handle(req);
                }

                const modifiedReq = req.clone({ //second observer [Http request]
                    params: new  HttpParams().set('auth', user.token) //we made use of the response of the first observer
                })
                return next.handle(req);
            })
        );
    }
}