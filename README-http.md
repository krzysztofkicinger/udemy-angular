# Services

## How to create a service that will perform HTTP requests?

Create **@Injectable** service that will be injected Http service:

```
@Injectable()
export class ServersService {

  constructor(private http: Http) {}

}
```

## How does Http service works?

1. Http service provides methods for making Http requests
2. Each request returns an Observable<Response>
3. The request is not performed until at least one Observer does subscribe to that Observable.

**To perform an Http Request, we need to subscribe to the Observable**

Return Observable from the service method:

```
storeServers(servers: any[]) : Observable<Response> {
    return this.http.post(this.baseUrl, servers);
}
```

Subscribe to the Observable in other Component:

```
onSaveServers() {
    this.serversService.storeServers(this.servers)
        .subscribe(response => console.log(response)
    )
}
```

## How to send additional Http Headers?

1. Create Headers object:

```
const headers = new Headers({
      'Content-Type': 'application/json'
});
```

2. Pass headers to the request through **RequestOptionsArgs**:

```
return this.http.post(`${this.baseUrl}/data.json`, servers, { headers });
```

## How to send GET request?

```
this.http.get(`${this.baseUrl}/data.json`);
```

### How to update existing data on the server - PUT request?

```
this.http.put(`${this.baseUrl}/data.json`, servers, { headers });
```

## How to unwrap data that is in the body of the Response using Observable Operators?

```
getServers() : Observable<any> {
    return this.http.get(`${this.baseUrl}/data.json`)
      .map(response => response.json());
}
```

## How to catch Http Errors?

1. Use **catch** method of the Observable:

```
return this.http.get(`${this.baseUrl}/data`)
      .catch(
        (errorResponse: Response) => {
          console.log(errorResponse)
          return Observable.throw(errorResponse);
        }
      )
```

Catch method takes Response (cause error is a Response) and must return Observable<Response>)

## How to use "async" pipe with Http Request?

1. Create a method that performs Http Request and **map**s the Observable<T> to T:

```
getAppName() {
    this.appName = this.http.get('https://udemy-ng-http-2866c.firebaseio.com/appName.json')
    .map(response => response.json());
}

```

2. Set the variable of type Observable<T> to the response.
3. Create a pipe in the template HTML:

```
<h1>{{ appName | async }}</h1>
```

**async** automatically subscribes to the request so there is no need for explicit subscription to the Observable in order to perfom the Http Request.