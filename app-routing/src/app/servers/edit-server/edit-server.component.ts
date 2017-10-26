import {Component, OnInit} from '@angular/core';

import {ServersService} from '../servers.service';
import {ActivatedRoute, ActivatedRouteSnapshot, Params} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {

  server: { id: number, name: string, status: string };
  serverName = '';
  serverStatus = '';
  queryParamsSubscription: Subscription;
  allowEdit = false;


  constructor(private serversService: ServersService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.checkIfEditActionIsPossible(this.routeSnapshot.queryParams);
    this.subscribeToQueryParamsChange();

    this.initializeServer(+this.routeSnapshot.params['id']);
    this.subscribeToParamsChange();
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

  checkIfEditActionIsPossible(queryParams: Params) {
    this.allowEdit = queryParams['allowEdit'] === '1';
  }

  initializeServer(id: number) {
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  subscribeToQueryParamsChange() {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (queryParams: Params) => this.checkIfEditActionIsPossible(queryParams)
    )
  }

  subscribeToParamsChange() {
    this.route.params.subscribe(
      (params: Params) => this.initializeServer(+params['id'])
    )
  }

  get routeSnapshot() : ActivatedRouteSnapshot {
    return this.route.snapshot;
  }

}
