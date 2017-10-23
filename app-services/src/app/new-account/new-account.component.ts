import {Component, OnInit} from '@angular/core';
import {AccountsService} from "../services/accounts.service";

@Component({
    selector: 'app-new-account',
    templateUrl: './new-account.component.html',
    styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {

    constructor(private accountService: AccountsService) {
    }

    ngOnInit() {
        this.accountService.statusUpdated.subscribe(
            (status: string) => alert(`Received new status: ${status}`)
        );
    }

    onCreateAccount(accountName: string, accountStatus: string) {
        this.accountService.addAccount(accountName, accountStatus);
    }

}
