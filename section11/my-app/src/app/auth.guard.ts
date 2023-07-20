import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { UrlTree } from '@angular/router';
import { 
    CanDeactivateFn,
    CanActivateFn,
    CanActivateChildFn,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router } from '@angular/router';
import { EditServerComponent } from './servers/edit-server/edit-server.component';

export const authParentGaurd: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    const authService = inject(AuthService);
    const router = inject(Router);
    
    return authService.isAuthenticated()
        .then((authenticated: boolean) => {
            if (authenticated) {
                return true;
            } else {
                router.navigate(['/']);
                return false;
            }
        }); 
}

export const authChildGaurd: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    return authParentGaurd(route, state); 
}

export const authDeactivateGaurd:CanDeactivateFn<EditServerComponent> = (component: EditServerComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot):Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree =>{
    if(!component.server)return true;

    if(!component.allowEdit){  //return if not allowed to edit
      return true;
    }
    else if((component.serverName !== component.server.name || component.serverStatus !== component.server.status) && !component.changesSaved){   //code check for service server amd component server data is same or not
      return confirm("Do you want to discard the changes");
    }
    else if(component.serverName === component.server.name && component.serverStatus === component.server.status){

        return true;
    }
    else return false;
}
