import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    serverElements = [
        {
            type: 'server',
            name: 'Test Server',
            content: 'Some Content'
        }
    ];

    onServerAdded(serverData: { serverName: string, serverContent: string }) {
        this.addServer('server', serverData);
    }

    onBlueprintAdded(blueprintData: { serverName: string, serverContent: string }) {
        this.addServer('blueprint', blueprintData);
    }

    private addServer(type: string, serverData: { serverName: string; serverContent: string }) {
        this.serverElements.push({
            type,
            name: serverData.serverName,
            content: serverData.serverContent
        });
    }

    onChangeFirstElement() {
        this.serverElements[0].name = "New name";
    }

    onRemoveFirstElement() {
        this.serverElements.splice(0, 1);
    }

}
