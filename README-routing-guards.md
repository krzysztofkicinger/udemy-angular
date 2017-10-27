# Guards (Protecting Routes)

## How to create a Guard?

1. Create a service that implements **CanActivate** interface:

```typescript
export class AuthGuard implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return null;
  }

}
```

Method parameters will be injected by Angular, when it switches routes.

2. Return if user should be available to visit the route:
    * Observable\<boolean>
    * Promise\<boolean>
    * boolean

There is also possibility of injecting a Router instance to the Service (Guard) and navigating the user to some page. Otherwise if false is returned, navigation will be stopped.

```typescript
constructor(private authService: AuthService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated()
      .then((authenticated: boolean) => {
        if(authenticated) {
          return true;
        } else {
          return this.router.navigate(["/"]);
        }
      })
      .catch(() => false);
  }
```

3. For Route(s) the Guard should be checked add **canActivate** property (it will also apply to all children paths):

```typescript
{
    path: 'servers',
    component: ServersComponent,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: ':id',
        component: ServerComponent
      },
      {
        path: ':id/edit',
        component: EditServerComponent
      }
    ]
  }
```

4. Add Guard and the Service to the **providers** attribute of **NgModule**

```typescript
@NgModule({
  providers: [
       ...,
    AuthService,
    AuthGuard
  ],
})
export class AppModule {
}
```

## How to protect child routes only (not the entire component)?

1. Implement **CanActivateChild** method

```
canActivateChild(childRoute: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
}
```

2. For Route(s) the Guard should be checked add **canActivateChild** property (it will also apply to all children paths):

```typescript
{
   path: 'servers',
   component: ServersComponent,
   canActivateChild: [ AuthGuard ],
   children: [
     {
       path: ':id',
       component: ServerComponent
     },
     {
       path: ':id/edit',
       component: EditServerComponent
     }
   ]
 }
```

> NOTE: Check also 'How to create a Guard?'

## How to control navigation with canDeactivate?

1. Create an **interface** that will check if user can leave some route

```
export interface CanComponentDeactivate {

  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean

}
```

2. Create a service that implements **CanDeactivate** method with passed as type **CanComponentDeactivate**

```
canDeactivate(component: CanComponentDeactivate,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate();
}
```

3. Add guard to the Route's **canDeactivate** attribute

```
{
    path: ':id/edit',
    component: EditServerComponent,
    canDeactivate: [ CanDeactivateGuard ]
}
```

4. Add Guard and the Service to the **providers** attribute of **NgModule**

```typescript
@NgModule({
  providers: [
       ...,
    CanDeactivateGuard
  ],
})
export class AppModule {}
```

5. Implements interface in the component that should be protected:

```
export class EditServerComponent implements OnInit, CanComponentDeactivate {

    ...

    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
        if(!this.allowEdit) {
          return true
        }
        if((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
          return confirm('Do you want to discard all changes?')
        }
        return true;
    }

}
```