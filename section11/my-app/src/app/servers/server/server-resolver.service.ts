import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ServersService } from "../servers.service";
import { Injectable } from "@angular/core";
import { Server } from "../server.model";


//inject service into another service
@Injectable()

//Resolve is generic type and it wrapp the data type i.e Server that we are going to fetch before the component is load
export class serverResolver implements Resolve<Server>{
    constructor(private serversService:ServersService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Server | Observable<Server> | Promise<Server>{
        return  this.serversService.getServer(+route.params['id']) as Server;
    }
} 