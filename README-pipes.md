# Pipes

* Transforms output
* There are pipes for synchronous and asynchronous data

## How to use pipes?

1. Add pipe to string interpolation:

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

## How to create a filter pipe?

