//Gaurd always need to be a service so we can use it

import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";


//inteface is he contract which is being imported by other class which  force a class to provide some logic 
export interface CanComponentDeactivate{
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}


//CanDeactivate is generic interface provided by angular that wrap  our own create interface canComponentDeactivate and forces to implement the canDeactivate method which help to connect component to deactivate gaurd
export class canDeactivateGaurd implements CanDeactivate<CanComponentDeactivate> {
    //compoent = component that we currently on
    canDeactivate(component: CanComponentDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean {
        return component.canDeactivate();
    }
}