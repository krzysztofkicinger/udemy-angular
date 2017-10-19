# Components and Databindings

Example app: databindings-app

## Property & Event Binding Overview

![Course Project Plannigs](./docs/property-event-binding.png)

## Binding to Custom Properties - Property Binding Between Components

We need to pass single server from AppComponent to ServerElementComponent in order to show some details

1. Create a property in ServerElementComponent that will serve as a server and decorate it with **@Input()** annotation

```typescript
@Input()
    element: {
        type: String,
        name: String,
        content: String
    };
```

2. Go to the **app.component.html** and pass the server object to the **app-server-element** component using **Property Binding**. The name must match the name of the variable:

```html
<app-server-element
        *ngFor="let server of serverElements"
        [element]="server">
</app-server-element>
```

3. (Optional) Create an alias for element - the name that this element will be represented outside of the component:

```typescript
@Input("serverElement")
    element: {
        type: String,
        name: String,
        content: String
    };
```

```html
<app-server-element
        *ngFor="let server of serverElements"
        [serverElement]="server">
</app-server-element>
```

## Binding to custom events - Passing events from child to parent component

We want to emit event that will inform parent component that some state has been changed.

1. Create an event callbacks in the parent component (AppComponent)

```typescript
onServerAdded(serverData: { serverName: string, serverContent: string }) {
    this.addServer('server', serverData);
}

onBlueprintAdded(blueprintData: { serverName: string, serverContent: string }) {
    this.addServer('blueprint', blueprintData);
}
```

This event callbacks are functions that receives as argument data required to fulfil business logic.

2. Create Event Emitters in child component (CockpitComponent) and decorate them with **@Output()** annotation

```
@Output()
serverCreated = new EventEmitter<{ serverName: string, serverContent: string }>();

@Output()
blueprintCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
```

EventEmitter is a generic type that takes as a type parameter class/blueprint that represents the data object emitted by the event. For example here we want to emit as a data an object that has two string properties (these attributes are required to fulfil parent's component contract/business logic)

3. Create Event Handlers for events triggered within a child component (CockpitComponent)

```typescript
onAddServer() {
    this.serverCreated.emit({
        serverName: this.newServerName,
        serverContent: this.newServerContent
    });
}

onAddBlueprint() {
    this.blueprintCreated.emit({
        serverName: this.newServerName,
        serverContent: this.newServerContent
    });
}
```

These event handlers will use the event emitters to inform 'subscribers' that event occurred.

4. Go to the parent's component template - **app.component.html** - and pass Event Callbacks (functions from parent component) as the subscribers to event. This is done by binding the EventEmitter from child component with callback from parent component:

```html
<app-cockpit
    (serverCreated)="onServerAdded($event)"
    (blueprintCreated)="onBlueprintAdded($event)">
</app-cockpit>
```

> IMPORTANT: Passed **$event** object is the data emitted through **emit(...)** method

5. (Optional) Enable alias in the same way as for **@Input()**

```
@Output('alias')
```

## View Encapsulation

