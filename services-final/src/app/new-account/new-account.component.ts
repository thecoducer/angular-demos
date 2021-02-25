import { Component, ElementRef, ViewChild } from '@angular/core';

import { LoggingService } from '../logging.service';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // providers: [LoggingService]
})
export class NewAccountComponent {
 
  constructor(private loggingService: LoggingService, private accountsService: AccountsService) {
    this.accountsService.statusUpdated.subscribe(
      (status: string) => alert('New Status: ' + status)
    );
  }

  // we get accountName and accountStatus from local references in this component's view
  onCreateAccount(accountName: HTMLInputElement, accountStatus: HTMLSelectElement) {
    this.accountsService.addAccount(accountName.value, accountStatus.value);
    // this.loggingService.logStatusChange(accountStatus);
    accountName.value = "";
  }
}