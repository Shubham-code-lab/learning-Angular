import { Injectable, EventEmitter } from "@angular/core";
import {InjectableService} from './injectableService.service';

@Injectable()

export class AccountsService{
    accounts = [
        {
          name: 'Master Account',
          status: 'active'
        },
        {
          name: 'Testaccount',
          status: 'inactive'
        },
        {
          name: 'Hidden Account',
          status: 'unknown'
        }
      ];

      constructor(private injectableService:InjectableService){}

      statusUpdated = new EventEmitter<string>();  //cross component communication
      //we can trigger this method in this service file or in component

      addAccount(name:string, status:string){
        this.accounts.push({name, status});
        this.injectableService.simpleLog();
      }

      updateAccount(id:number, status:string){
        this.accounts[id].status = status;
        this.injectableService.simpleLog();
      }
}