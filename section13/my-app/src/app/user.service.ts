import {Injectable, EventEmitter} from "@angular/core";
import { Subject } from "rxjs";

//modern way to provide similar to providers in app.module
@Injectable({providedIn:'root'})

export class UserService {
    // activatedEmitter = new EventEmitter<boolean>();
    activatedEmitter = new Subject<boolean>(); //using as cross component communication event emmiter where manully call next or emmit and subscribe to it //useless when @Output where we not subscribe
}