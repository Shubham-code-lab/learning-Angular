import { Component, EventEmitter, Output } from '@angular/core';
import { AccountsService } from '../accouts.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers:[LoggingService]
})

export class NewAccountComponent {
  // @Output() accountAdded = new EventEmitter<{name: string, status: string}>();

  constructor(private accountsService: AccountsService, private loggingService: LoggingService){
    this.accountsService.statusUpdated.subscribe((status:string)=>{
      alert("New status is :-" + status);
    })
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    // this.accountAdded.emit({
    //   name: accountName,
    //   status: accountStatus
    // });
    // console.log('A server status changed, new status: ' + accountStatus);

    this.accountsService.addAccount(accountName, accountStatus);
    this.loggingService.logStatusChange(accountStatus);
  }
}
