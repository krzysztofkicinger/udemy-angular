# Services and Dependency Injection

## What are Services?

* Typical use cases:
    * Extraction of duplication of logic
    * Data storage
* Acts as a central repository

## Dependency Injection - Hierarchical Injector

* DI is done by Angular automatically
* We need to inform Angular that we need the Dependency to be injected

Understanding the Hierarchical Injector:
* When Angular injects a components, it creates one for the component an **all of its child components**
* Service in the child component will be the same as the one of the parent

Levels of Hierarchical Injector Components:
* **Application-wide** - if we add to the module (AppModule), then the same instance is available application-wide, you can achieve that by adding a class name to the **providers** table of the **@NgModule** annotation

```
@NgModule({
    ...,
    providers: [],
})
export class AppModule { ... }
```

* **App-component-wide** - if we add to the component (AppComponent), then same instance of the service is available for **all components** (but **not for other services**)
    * Add it to the **providers** table of parent component
    * Do **not** add it as a provider to the child component, but inject it in the constructor

```
@Component({
    ...,
    providers: [ AccountsService ]
})
export class AppComponent { ... }
```

```
@Component({
    ...
})
export class AccountComponent {

    constructor(private accountService: AccountsService) {}

}
```

* **Single-component** - same instance of Service is available for **the component and all its child components**, you can achieve that by adding a class name to the **providers** table of the **@Component** annotation

```
@Component({
    ...,
    providers: [LoggingService]
})
export class NewAccountComponent {

    constructor(private loggingService: LoggingService) { ... }

}
```

## How to create a service?

1. Create a file which exports a class. Class does not have to be annotated, cause service is just a simple Type Script class:

```
export class LoggingService { ... }
```

2. Create a centralized method for business logic:

```
logStatusChange(status: string) {
    console.log('A server status changed, new status: ' + status);
}
```

## How to get access to the service from other components?

1. Add required service as an argument to the constructor of the component which the service should be injected to:

```
constructor(private loggingService: LoggingService) { ... }
```

Angular is responsible for creating injected service.

2. Provide a service to the component (add to **providers** property of the **@Component** annotation the service class):

```
@Component({
    ...,
    providers: [LoggingService]
})
export class NewAccountComponent {

    constructor(private loggingService: LoggingService) { ... }

}
```

## How to inject service to a service?

1. Annotate the service to which another service is injected using **@Injectable**

```
@Injectable()
export class AccountsService {

    constructor(private loggingService: LoggingService) {}

}
```

> @Injectable() = to this service we are able to inject another service

## Cross-Component communication with a Service

1. Create an EventEmitter/Observable in a Service:

```
@Injectable()
export class AccountsService {

    statusUpdated = new EventEmitter<string>();

}
```

2. Emit an event from one component:

```
@Component({ ... })
export class AccountComponent {

    onSetTo(status: string) {
        this.accountService.statusUpdated.emit(status);
    }

}
```

3. Subscribe in another service for emitted event:

```
@Component({ ... })
export class NewAccountComponent implements OnInit {

    ngOnInit() {
        this.accountService.statusUpdated.subscribe(
            (status: string) => alert(`Received new status: ${status}`)
        );
    }

}
```