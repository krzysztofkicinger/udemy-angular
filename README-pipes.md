# Pipes

* Transforms output
* There are pipes for synchronous and asynchronous data

## How to use pipes?

1. Add pipe to some output expression (e.g. string interpolation, ngFor, ...) :

```
{{ server.instanceType | uppercase }}
```

```
{{ server.started | date }}
```

## How to parametrize pipes?

1. Use a pipe and pass parameter(s):

```
{{ server.started | date: 'fullDate' }}
```

## Where to check built-in pipes?

https://angular.io/api?query=pipe

## How to chain multiple pipes?

> IMPORTANT: Order is important

```
{{ server.started | date: 'fullDate' | uppercase }}
```

## How to create a custom pipe?

1. Create a new pipe file (or use ``ng g p <name>``)
2. Create a class that implements **PipeTransform**

```
export class ShortenPipe implements PipeTransform {

  transform(value: any, ...args): any {
    return value;
  }

}
```

3. Decorate the class with **@Pipe** decorator that takes as an argument the configuration object.
    * **name** - name of the pipe (this is how we apply it in the template)

```
@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform { ... }
```

4. Add class to the **declarations** of the **@NgModule**

```
@NgModule({
  declarations: [
    ...,
    ShortenPipe
  ],
  ...
})
export class AppModule { }
```

5. Apply a pipe in the HTML template:

```
{{ server.name | shorten }}
```

## How to pass properties to custom pipe?

1. Add parameter to **transform** method:

```
transform(value: any, limit: number) : any {
    return value.length > limit ? `${value.substr(0, limit)}...` : value;
}
```

2. Pass argument in the HTML template:

```
{{ server.name | shorten : 5 }}
```

**How to pass multiple properties to custom pipe?**

**transform** method as second argument can receive the **args** vararg:

```
transform(value: any, ...args): any { ... }
```

This argument is an array of all passed values to the pipe:

```
shorten : '15' : '3'
```

```
args: [ '15', '3' ]
```

## How to create a filter pipe for ngFor?

```
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: String, propName: string): any {
    console.log("Filter String: " + filterString);
    if(value.length === 0 || !filterString) {
      return value;
    }

    const resultArray = [];
    for(const item of value) {
      if(item[propName] === filterString) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
```

```
<li
    class="list-group-item"
    *ngFor="let server of servers | filter : filteredStatus : 'status'"
    [ngClass]="getStatusClasses(server)">
```

## Pure and Impure pipes - how to fix a filter pipe?

* Filter pipe does not react on changes made to the backing list of the ngFor.
* Angular does not rerun the pipe when data changes - Updating an Arrays or Objects does not trigger pipe
* Updating input (filter input) does trigger the pipe
* It would cost a lot of performance

**How to force pipe to update when Arrays or Objects change?**

```
@Pipe({
  ...,
  pure: false
})
```

> REMEMBER: It has a great impact on the performance

## How to create an async pipe?

* Async pipe works with asynchronous data.
* It recognizes the Observables and Promises

1. We have na asynchronous data:

```
appStatus = new Promise((resolve, reject) => {
    setTimeout(() => resolve('stable'), 2000)
});
```

2. Display the data in the HTML template with **async** pipe:

```
{{ appStatus | async }}
```

