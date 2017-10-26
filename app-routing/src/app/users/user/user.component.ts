import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Params} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  user: { id: number, name: string };
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.initializeUser(this.routeSnapshot.params);
    this.subscribeToParamsChanges();
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  private subscribeToParamsChanges() {
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => this.initializeUser(params)
    );
  }

  private initializeUser(params: Params) {
    this.user = {
      id: this.routeSnapshot.params['id'],
      name: this.routeSnapshot.params['name'],
    }
  }

  private get routeSnapshot() : ActivatedRouteSnapshot {
    return this.route.snapshot;
  }

}
