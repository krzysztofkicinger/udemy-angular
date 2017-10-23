import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LoggingService} from "../services/logging.service";
import {AccountsService} from "../services/accounts.service";

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent {

    @Input() id: number;
    @Input() account: { name: string, status: string };

    constructor(private accountService: AccountsService) {}

    onSetTo(status: string) {
        this.accountService.changeStatus(this.id, status);
        this.accountService.statusUpdated.emit(status);
    }

}
