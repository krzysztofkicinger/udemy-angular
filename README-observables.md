# Observables

## What is Observable/Observer?

**Observable**

* Can be think of a Data Source
* Various Data Sources: (User Input) Events, Http Requests, Triggered in Code
* Follows the Observer pattern

**Observer**

* Action that should be performed when Observable serves some data
* How to handle data packages?
    * Handle Data
    * Handle Error
    * Handle Completion

## How to create an Observable?

1. Import **rxjs/Rx** (required for methods connected with Observables, Observers, etc.)

```
import 'rxjs/Rx';
```

2. Create a simple Observable using an **interval** factory method:

```
const myNumbers = Observable.interval(1000);
```

3. Subscribe to the Observable

```
myNumbers.subscribe(
      (number: number) => console.log(number)
)
```

## How to create Observable from scratch?

**IMPORTANT: Distinction between Observable, Observer and Subscriber**

Observer - is the final Observer, but we pass it to the Observable's function which will make up our Observable, we basically tell the Observer when it will take some data
Subscriber - subscriber to the data, we use it to react to the data changes

1. Use **Observable.create** helper method that takes a function as an argument. This function should hold asynchronous code:

```
const observable = Observable.create(
      (observer : Observer<String>) => { ... }
);
```

2.1. Pass the data to the Observer - **next** method:

```
observer.next('First Package')
```

2.2. Pass the error to the Observer - **error** method:

```
observer.error('Error')
```

2.3 Complete the Observable by invoking Observer's **complete** method:

```
observer.complete(),
```

3. Subscribe to the observable:

```
observable.subscribe(
      (data: string) => console.log(`Package ${data}`),
      (error: any) => console.error(error),
      () => console.log('Observable Completed!')
);
```

Observable can finish by sending an error or by being completed.

## How to unsubscribe from Observable?

Make sure you always unsubscribe from the Observable when it is no longer needed (for example when changing the route). Not doing so leads to memory leaks.

1. Create a **Subscription** property

```
private numberSubscription: Subscription;
```

2. Initialize **Subscription** properties when subscribing to an **Observable**:

```
this.numberSubscription = myNumbers.subscribe(
      (number: number) => console.log(number)
)
```

3. Implement **OnDestroy** interface and unsubscribe:

```
ngOnDestroy(): void {
    this.numberSubscription.unsubscribe();
}
```

## How to use Subject to pass and listen to Data?

**Subject** - Observable and Observer at the same time

1. Create a service that will have the Subject property:

```
export class UsersService {

  userActivated = new Subject();

}
```

2. Inject service to components and call appropriate Observer and Observable methods:

Observable:

```
onActivate() {
    this.usersService.userActivated.next(this.id);
  }
```

Subscriber:

```
ngOnInit() {
    this.usersService.userActivated.subscribe(
        (id: number) => { ... }
    )
}

ngOnDestroy(): void {
    this.usersService.userActivated.unsubscribe();
}
```


## How to use Observable Operators?

**Operators** - transform the data that is receive and still stay in the "Observable environment"
    * Returns observables - can be chained

```
const myNumbers = Observable.interval(1000)
      .map((data: number) => data * 2);
```