import {Component, OnDestroy, OnInit} from '@angular/core';

import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {Observer} from "rxjs/Observer";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private numberSubscription: Subscription;
  private customSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    this.initializeNumbersObservable();
    this.initializeObservableFromScratch();
  }

  private initializeNumbersObservable() {
    const myNumbers = Observable.interval(1000)
      .map((data: number) => data * 2);


    this.numberSubscription = myNumbers.subscribe(
      (number: number) => console.log(number)
    )
  }

  private initializeObservableFromScratch() {
    const observable = Observable.create(
      (observer : Observer<string>) => {
        setTimeout(
          () => observer.next('First Package'),
          2000
        );
        setTimeout(
          () => observer.next('Second Package'),
          4000
        );

        // setTimeout(
        //   () => observer.error({
        //     type: 'BAD_REQUEST',
        //     message: 'Sorry, but your request was incorrect...'
        //   }),
        //   5000
        // );
        setTimeout(
          () => observer.complete(),
          7000
        );
      }
    );

    this.customSubscription = observable.subscribe(
      (data: string) => console.log(`Package ${data}`),
      (error: any) => console.error(error),
      () => console.log('Observable Completed!')
    );
  }


  ngOnDestroy(): void {
    this.numberSubscription.unsubscribe();
    this.customSubscription.unsubscribe();
  }

}
