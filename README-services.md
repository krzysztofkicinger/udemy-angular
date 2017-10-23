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
* **Application-wide** - if we add to the module (AppModule), then the same instance is available application-wide
* **

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

