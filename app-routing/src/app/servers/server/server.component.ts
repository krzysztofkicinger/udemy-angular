import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, ActivatedRouteSnapshot, Params, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  server: {id: number, name: string, status: string};
  paramsChangeSubscription: Subscription;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.initializeServer(+this.routeSnapshot.params['id']); // casting to number
    this.subscribeToParamsChange();
  }

  private subscribeToParamsChange() {
    this.paramsChangeSubscription = this.route.params.subscribe(
      (params: Params) => this.initializeServer(+params['id'])
    )
  }

  private initializeServer(id: number = 1) {
    this.server = this.serversService.getServer(id);
  }

  private get routeSnapshot(): ActivatedRouteSnapshot {
    return this.route.snapshot;
  }

  onEdit() {
    this.router.navigate(["edit"], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve'
    })
  }
}
