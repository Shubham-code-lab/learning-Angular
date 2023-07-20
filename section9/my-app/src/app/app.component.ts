import { Component, OnInit } from '@angular/core';
import { AccountsService } from './accouts.service';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[LoggingService]    //we don't add AccountService as we want same instance used in other component (but we have added it in app.module.ts component) but we do need to add it in constructor
})
export class AppComponent implements OnInit{
  accounts:{name:string, status:string}[]=[];
  constructor(private accountsService: AccountsService, private loggingService: LoggingService){  //AccountsService uses same instance and LoggingService uses new instance
  }

  ngOnInit(): void {
    this.accounts = this.accountsService.accounts;      //referance type as it is array
  }
}
