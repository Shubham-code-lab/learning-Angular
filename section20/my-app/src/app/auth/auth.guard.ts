import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, map, tap, take } from 'rxjs';
import { UrlTree } from '@angular/router';
import { 
    CanDeactivateFn,
    CanActivateFn,
    CanActivateChildFn,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router } from '@angular/router';    
import { TitleCasePipe } from '@angular/common';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    const authService = inject(AuthService);
    const router = inject(Router);
    
    return authService.user.pipe(
        take(1),
        map(user=>{
            const isAuth = !!user;
            if(isAuth){
                return true;
            }
            return router.createUrlTree(['/auth']);  //to avoid race condition
        }),
        // tap(isAuth=>{   //will give rise to race condition due to multiple redirect
        //     if(!isAuth){
        //         router.navigate(['/']);
        //     }
        // })
    )
}

// export const authChildGaurd: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
//     return authParentGaurd(route, state); 
// }

// export const authDeactivateGaurd:CanDeactivateFn<EditServerComponent> = (component: EditServerComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot):Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree =>{
//     if(!component.server)return true;

//     if(!component.allowEdit){  //return if not allowed to edit
//       return true;
//     }
//     else if((component.serverName !== component.server.name || component.serverStatus !== component.server.status) && !component.changesSaved){   //code check for service server amd component server data is same or not
//       return confirm("Do you want to discard the changes");
//     }
//     else if(component.serverName === component.server.name && component.serverStatus === component.server.status){

//         return true;
//     }
//     else return false;
// }
