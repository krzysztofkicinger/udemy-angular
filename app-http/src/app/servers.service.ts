import { Injectable } from '@angular/core';
import {Headers, Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

@Injectable()
export class ServersService {

  private baseUrl = 'https://udemy-ng-http-2866c.firebaseio.com/';

  constructor(private http: Http) {}


  getServers() : Observable<any> {
    return this.http.get(`${this.baseUrl}/data.json`)
      .map(response => response.json());
  }

  storeServers(servers: any[]) : Observable<Response> {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.put(`${this.baseUrl}/data.json`, servers, { headers });
  }

}
