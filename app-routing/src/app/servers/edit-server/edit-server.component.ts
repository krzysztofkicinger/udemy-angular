import {Component, OnInit} from '@angular/core';

import {ServersService} from '../servers.service';
import {ActivatedRoute, ActivatedRouteSnapshot, Params, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {CanComponentDeactivate} from "../../can-deactivate-guard.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {

  server: { id: number, name: string, status: string };
  serverName = '';
  serverStatus = '';
  queryParamsSubscription: Subscription;
  allowEdit = false;
  changesSaved = false;


  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.checkIfEditActionIsPossible(this.routeSnapshot.queryParams);
    this.subscribeToQueryParamsChange();

    this.initializeServer(+this.routeSnapshot.params['id']);
    this.subscribeToParamsChange();
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {
      relativeTo: this.route
    });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(!this.allowEdit) {
      return true
    }
    if((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
      return confirm('Do you want to discard all changes?')
    }
    return true;
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
