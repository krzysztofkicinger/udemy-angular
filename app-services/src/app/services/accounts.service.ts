import {LoggingService} from "./logging.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AccountsService {

    accounts = [
        AccountsService.createAccount('Master Account', 'active'),
        AccountsService.createAccount('Testaccount', 'inactive'),
        AccountsService.createAccount('Hidden Account', 'unknown')
    ];

    constructor(private loggingService: LoggingService) {}

    addAccount(name: string, status: string) {
        this.accounts.push(AccountsService.createAccount(name, status));
    }

    changeStatus(id: number, status: string) {
        this.accounts[id].status = status;
        this.loggingService.logStatusChange(status);
    }

    private static createAccount(name: string, status: string) {
        return { name, status }
    }

}
