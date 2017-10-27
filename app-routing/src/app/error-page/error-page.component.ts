import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Data} from "@angular/router";

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  errorMessage: String;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.errorMessage = this.routeSnapshot.data['message'];
    // this.route.data.subscribe(
    //   (data: Data) => this.errorMessage = data['message']
    // )
  }

  get routeSnapshot() : ActivatedRouteSnapshot {
    return this.route.snapshot;
  }

}
