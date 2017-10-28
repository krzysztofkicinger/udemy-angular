import {Component, OnInit} from '@angular/core';
import {ServersService} from "./servers.service";
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  appName: Observable<String>;
  servers = [];
  //   {
  //     name: 'Testserver',
  //     capacity: 10,
  //     id: this.generateId()
  //   },
  //   {
  //     name: 'Liveserver',
  //     capacity: 100,
  //     id: this.generateId()
  //   }
  // ];

  constructor(private http: Http, private serversService: ServersService) {
  }

  ngOnInit() {
    // this.serversService.invalidRequest();
    this.serversService.getServers()
      .subscribe(
        (servers: any[]) => this.servers = servers, //console.log(servers),
        error => console.error(error)
      );
    this.getAppName();
  }

  getAppName() {
    this.appName = this.http.get('https://udemy-ng-http-2866c.firebaseio.com/appName.json')
      .map(response => response.json());
  }

  onAddServer(name: string) {
    this.servers.push({
      name: name,
      capacity: 50,
      id: this.generateId()
    });
  }

  onSaveServers() {
    this.serversService.storeServers(this.servers)
      .subscribe(
        response => console.log(response),
        error => console.error(error)
      )
  }

  private generateId() {
    return Math.round(Math.random() * 10000);
  }
}
