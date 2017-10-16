# Udemy - Angular 4

## Creating Angular application using angular-cli

```bash
npm install -g @angular/cli
ng new <application-name>
ng server
```
**ng-build** - builds the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

**ng-serve** - starts dev sever, application will reload with any changes in source files occurs



## How to generate new elements using angular-cli?

```bash
ng generate component <component-name>
ng generate directive <directive-name>
ng generate pipe <pipe-name>
ng generate service <service-name>
ng generate class <class-name>
ng generate guard <guard-name>
ng generate interface <interface-name>
ng generate enum <enum-name>
ng generate module <module-name>
```

## How to run tests using angular-cli?

Run unit tests (using Karma):

```bash
ng test
```

Run e2e tests (using Protractor)

```bash
ng e2e
```

