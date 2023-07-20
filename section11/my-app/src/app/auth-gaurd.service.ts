import {
    CanActivate,
    CanActivateChild,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';


@Injectable()

export class AuthGuard implements CanActivate{

    constructor(private authService:AuthService, private router: Router){}

    canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
        return this.authService.isAuthenticated()
                .then(
                    (authenticated: boolean) => {
                        if(authenticated) return true;
                        else {
                            this.router.navigate(['/']);
                            return false;
                        }
                    }
                )
    }

    canActivateChild(route:ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
        return this.canActivate(route, state);   //we can add our own logic but lets reuse do same thing as canActivate
    }
}