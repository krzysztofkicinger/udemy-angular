import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-cockpit',
    templateUrl: './cockpit.component.html',
    styleUrls: ['./cockpit.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class CockpitComponent implements OnInit {

    @Output()
    serverCreated = new EventEmitter<{ serverName: string, serverContent: string }>();

    @Output()
    blueprintCreated = new EventEmitter<{ serverName: string, serverContent: string }>();

    @ViewChild('serverContentInput')
    serverContentInput: ElementRef;

    // newServerName = '';
    // newServerContent = '';

    constructor() {
    }

    ngOnInit() {
    }


    onAddServer(serverNameInput: HTMLInputElement) {
        this.serverCreated.emit({
            serverName: serverNameInput.value,
            serverContent: this.serverContentInput.nativeElement.value
        });
    }

    onAddBlueprint(serverNameInput: HTMLInputElement) {
        this.blueprintCreated.emit({
            serverName: serverNameInput.value,
            serverContent: this.serverContentInput.nativeElement.value
        });
    }

}
