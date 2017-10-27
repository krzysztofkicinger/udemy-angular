# Routing

## How to define Routes?

1. Create an array of Routes

```typescript
const appRoutes: Routes = [];
```

2. Create an object that represent a Route:
    * **path** - path part of the location object that will be matched when user request it
    * **component** - component that should be loaded when path matched

```typescript
const appRoutes: Routes = [
  {
    path: 'users',
    component: UsersComponent
  }
];
```

Add another Routes.

3. Add RouterModule to the module's **imports** with invoking a method **forRoot**:

```typescript
@NgModule({
    ...,
    imports: [
        RouterModule
    ],
    ...
})
export class AppModule { }
```

4. Add in the main page (AppModule) the **router-outlet** tag that will be replaced by components from matched path:

```html
<div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <router-outlet></router-outlet>
    </div>
  </div>
```

## How to set navigation link?

1. Use the **routerLink** attribute of *\<a>* element

```html
<a routerLink="/users">Users</a>
```

This can also be used as a **Property Binding** but then the string must be returned:

```html
<a [routerLink]="'/users'">Users</a>
<a [routerLink]="getSomePath()">Users</a>
<a [routerLink]="['users']">Users</a>
```

The array contains elements of the path.

> IMPORTANT: Do not use the **href** tag with path, cause it will **reload** the entire page

## Differentiation between absolute and relative paths

1. Relative paths:

```html
<a routerLink="users">Users</a>
```

The child path of the current path. If we are in the **/servers** then clicking this link will send us to the **/servers/users**.

Relative paths can be used like in a directory structure:

```html
<a routerLink="../users">Users</a>
```

2. Absolute paths:

```html
<a routerLink="/users">Users</a>
```

Always sends us to the **/users** path.

## How to style active router links?

1. Add **routerLinkActive** to the \<a> element or the parent element:

```html
<li role="presentation" routerLinkActive="active">
    <a routerLink="/">Home</a>
</li>
```

By default it marks the path as active if the location path contains router path, so for /servers the / will be also marked as active.

2. Add configuration object to match routes exactly - **[routerLinkActiveOptions]** (with property binding):

```html
<li role="presentation"
    routerLinkActive="active"
    [routerLinkActiveOptions]="{
      exact: true
    }">
  <a routerLink="/">Home</a>
</li>
```

## How to change paths programmatically?

1. Create some event handler and connect it by event binding with an HTML element:

```html
<button class="btn btn-primary"
        (click)="onLoadServers()">
  Load servers
</button>
```

```typescript
onLoadServers() {
    // complex calculation
}
```

2. Inject **Router** property to the component:

```typescript
constructor(private router: Router) { }
```

3. Invoke **navigate** method with an [] that represents parts of the path:

```typescript
onLoadServers() {
    // complex calculation
    this.router.navigate([ "/servers"]);
}
```

## How to change to relative path programatically?

By default the **navigate** method always treats passed paths as an absolute path. Why? Because it does not know which path application is currently on.

1. Inject **ActivatedRoute** object - the route application is currently on:

```typescript
constructor(private serversService: ServersService,
            private router: Router,
            private route: ActivatedRoute) {
}
```

2. Passed **extras** parameter to the **navigate** method and set **relativeTo** property:

```typescript
onReload() {
    this.router.navigate(["servers"], {
        relativeTo: this.route
    });
}
```

## How to pass/access path variables?

1. Add another Route entry to the Routes table.

```
{
    path: 'users/:id',
    component: UserComponent
}
```

Parameter is prefixed with **:** - **:id**.

2. Inject the **ActivatedRoute** to the component matched with the path:

```
constructor(private route: ActivatedRoute) { }
```

3. Access the **ActivatedRouteSnapshot** that represents current path (normally ActivatedRoute treats as an Observable, but ActivatedRouteSnapshot is a snapshot of the Observable from particular moment of time)

```
private get routeSnapshot() : ActivatedRouteSnapshot {
    return this.route.snapshot;
}
```

4. Get passed params map (id) from ActivatedRouteSnapshot:

```
ngOnInit() {
    this.user = {
        id: this.routeSnapshot.params['id'],
        ...
    }
  }
```

## How to reload data when accessing the same path (component) we are currently on?

When we are on /users/10/Max page and tries to go to the /users/15/Anna then location path (URL) changes but the data does not. Angular by default does not reload the component that is currently rendered.

The problem is that we are using the **snapshot** of the data which is correct but **only for the initialization**. In order to be able to access changes within the same path we need to access **params** from the **ActivatedRoute** which are **Observables**

1. Access params from the **ActivatedRoute** which are **Observable**:

```typescript
this.route.params
```

2. Subscribe to change params event - **subscribe** method:

```typescript
private subscribeToParamsChanges() {
    this.route.params.subscribe(
        (params: Params) => this.initializeUser(params)
    );
}
```

3. Perform first initialization and subscribe to changes in the **ngOnInit**

```typescript
ngOnInit() {
    this.initializeUser(this.routeSnapshot.params);
    this.subscribeToParamsChanges();
}
```

4. Angular will automatically unsubscribe when leaving component, but to do it manually create an property of **Subscription** type and unsubscribe in the **ngOnDestroy** method:

```
ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
```

## How to pass query parameters and fragments?

Query parameters: **?mode=editing**
Fragments: **#loading**

1. Create a link with the **routerLink** and **queryParams**

```
<a
    [routerLink]="[ i, 'edit']"
    [queryParams]="{
      allowEdit: 1
    }">
        {{ server.name }}
</a>
```

**[queryParams]** (property binding) - takes an JS object:
    * keys - names of the query parameters
    * values - value of the parameter

2. Add a **fragment** attribute to the link

```
<a
    [routerLink]="[ i, 'edit']"
    [queryParams]="{
      allowEdit: 1
    }"
    fragment="loading">
        {{ server.name }}
</a>
```

Fragment can be a string or when using as a property binding it can be any expression that will results a String:

```
fragment="loading"
[fragment]="'loading'"
[fragment]="getFragmentName()"
```

Final URL will look like: .../1/edit?allowEdit=1#loading

3. To pass it programmatically use **navigate** method and pass **extras** property:

```
this.router.navigate([ "/servers", id, "edit"], {
      queryParams: {
        allowEdit: 1
      },
      fragment: 'loading'
});
```

4. To access passed data inject **ActivatedRoute**:

```
constructor(private serversService: ServersService,
            private route: ActivatedRoute) { }
```

5. There are two ways to access it:
    * Using **snapshot**
    * Using **Observable**

ngOnInit:

```
ngOnInit() {
    this.initializeQueryParams(this.route.snapshot.queryParams);
    this.subscribeToQueryParamsChange();
}
```

Snapshot approach:

```
initializeQueryParams(queryParams: Params) {
    console.log(this.route.snapshot.queryParams);
}
```

Observable approach:

```
subscribeToQueryParamsChange() {
    this.route.queryParams.subscribe(
        (queryParams: Params) => this.initializeQueryParams(queryParams)
    )
}
```

The same applies for **fragment**

6. You can always unsubscribe (but Angular will do this automatically).

## How to set up child (nested) routes?

1. Create a Route with **children** attribute:

```js
{
    path: 'servers',
    component: ServersComponent,
    children: [
        {
            path: ':id',
            component: ServersComponent
        },
        {
            path: ':id/edit',
            component: EditServerComponent
        }
    ]
}
```

2. Children routes does not take part in rendering process of the parent component. This means that if we want to define **children** then on the parent component we need to add **\<router-outlet>** (ServersComponent):

```html
<div class="col-xs-12 col-sm-4">
    <router-outlet></router-outlet>
</div>
```

## How to preserve query params during navigation?

By default when navigating from one path to another query params and fragment sections of the URL are discarded.

1. Use the **queryParamHandling** strategy (**extras** or attribute):

```typescript
onEdit() {
    this.router.navigate(["edit"], {
        relativeTo: this.route,
        queryParamsHandling: 'preserve'
    })
}
```

Possible values:
* **merge** - current query params will be merged with those which should be passed with this request
* **preserve** - current query params will be passed in this request


## How to redirect or wildcard a route?

1. Create a component for PageNotFound functionality (ng g c ...)
2. Create new Route in the table:

```
{
    path: 'not-found',
    component: PageNotFoundComponentComponent
}
```

3. Redirect all URLs that do not match previously mentioned routes to not-found path (this **must** be the last Route, cause routes are matched in order):

```
{
    path: '**',
    redirectTo: '/not-found'
}
```

> Note: There always must be a **redirectTo** or **component** in the Route definition

**IMPORTANT: Redirection path matching**

Angular matches paths by prefix - routes '/' and '/recipes' will both match the ``{ path: '', redirectTo: '/sth-else' }``.

The default matching strategy is **prefix** - Angular checks if the **path** entered in the URL does **start with the path** specified in the route. In order to override this behavior, we need to change those strategy to **full**:

```
{
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
}
```

## How to outsource the routes configuration?

1. Create new module (AppRoutingModule)

```
@NgModule({ ... })
export class AppRoutingModule {
}
```

2. Move routes definition to the AppRoutingModule file
3. Configure routing by importing **RouterModule**:

```
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ]
})
```

4. Export the **RouterModule**

Export points all modules that should be available for another module that will import our router module

```
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
```

5. Import in the main application module newly create router module:

```
@NgModule({
  imports: [
    ...,
    AppRoutingModule
  ],
  ...
})
export class AppModule {
}
```

## How to pass static data to Route's component?

1. Go to the component and define a property (do not bind it):

```
export class ErrorPageComponent implements OnInit {

  errorMessage: String;

}
```

2. Go to the Route definition and add **data** property with object that represents static data:

```
{
    path: 'not-found',
    component: ErrorPageComponent,
    data: {
      message: 'Page not found!'
    }
}
```

3. Access static data object through **ActivatedRouteSnapshot**

```
export class ErrorPageComponent implements OnInit {

  errorMessage: String;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
      // this.errorMessage = this.routeSnapshot.data['message'];
      this.route.data.subscribe(
        (data: Data) => this.errorMessage = data['message']
      )
    }

  get routeSnapshot() : ActivatedRouteSnapshot {
    return this.route.snapshot;
  }

}
```

## How to pass dynamic data to route?

Problem: We have to fetch data before component will appear - we need to use a **Resolver**.

Resolver is a service which allows us to run some code before a route is rendered. Resolver always renders a component at the end but it will do some pre-loading.

1. Create a resolve service:

```typescript
export class ServerResolver implements Resolve<Server> {

  resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server {
      return this.serversService.getServer(+route.params['id']);
  }

}
```

2. Add resolver to **providers** of the NgModule:

```
@NgModule({
  providers: [
    ...,
    ServerResolver
  ],
})
```

3. Add resolve to route:

```
{
        path: ':id',
        component: ServerComponent,
        resolve: {
          server: ServerResolver
        }
}
```

**resolve** property takes the JS object whose keys are the names of the properties that resolver returns the value for.

4. Subscribe to **data** changes in the component that should be returned the data from the resolver:

```
{
export class ServerComponent implements OnInit {
    ...

    ngOnInit() {
        this.route.data.subscribe(
            (data: Data) => this.initialize(data['server'])
        );
    }
}
```

**Other Solution**

* Perform logic in the **ngOnInit**
* First show some spinner
* Then add the observable that will subscribe to data loaded by the component
* Close the spinner and add the information about the resource when acquired

## Location Strategies

When Angular application is hosted on production it is hosted by some server. This server will be responsible for resolving the location path first and there is great likelihood that it will not have the same routers as Angular applications.

We have to enable # location.

Go to the Routing Module and add hash in the **forRoot** method:

```
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      useHash: true
    })
  ],
  ...
})
```

This says that the server will only be responsible for the part of the URL before the hash. Then the rest is treated as the fragment.

The better solution would be to use htmlHistory mode.