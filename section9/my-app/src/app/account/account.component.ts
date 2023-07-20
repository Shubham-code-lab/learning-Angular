import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountsService } from '../accouts.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers:[LoggingService]
})
export class AccountComponent {
  @Input() account: {name: string, status: string} = {name:"", status:""};
  @Input() id?: number;
  // @Output() statusChanged = new EventEmitter<{id: number, newStatus: string}>();

  constructor(private accountsService: AccountsService, private loggingService: LoggingService){}

  onSetTo(status: string) {
    if(!this.id)return;
    // this.statusChanged.emit({id: this.id, newStatus: status});
    this.accountsService.updateAccount(this.id, status)
    this.loggingService.logStatusChange(status);

    this.accountsService.statusUpdated.emit(status);   //cross component communication subscribe in new-account
  }
}
