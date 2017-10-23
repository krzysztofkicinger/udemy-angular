# Directives

* Directive does not have view
* Directive can implement two lifecycle hooks: OnInit, OnDestroy
* The best place to perform directive logic is in the OnInit
* It's not a best practice to access elements directly in the directive - use **Renderer** to modify the element

## Attribute Directives

* Set on elements just like attributes
* Changes the properties of the DOM's element, but not creates or removes DOM elements
* Look like a normal HTML Attribute (possibly with databinding or event binding)
* Only affect/change the element they are added to
* [...] - binding to some property on our directive

### [ngClass]

Takes as a value a JS object whose keys are the name of the classes that may be applied and it's values are boolean expressions that checks wheter to apply the class or not.

Syntax:

```
[ngClass]="{
    <class_name> : <boolean_expression>,
    <class_name2> : <boolean_expression2>,
    ...
}"
```

Example:

```
[ngClass]="{
    even: number % 2 !== 0
}"
```

### [ngStyle]

Allows to pass an object with styles.

Syntax:

```
[ngStyle]="{
    <css_property> : <value>,
    <css_property2> : <value>,
    ...
}"
```

Example:

```
[ngStyle]="{
    background-color: number % 2 !== 0 ? 'yellow' : 'transparent'
}"
```

## Structural Directives

* Set on elements just like attributes (the same as Attribute) but also changes the DOM structure around this element
* Look like a normal HTML Attribute but have a leading * (for desugaring)
* Affect a whole area in the DOM (elements get added/removed)
* Cannot be more than one structural directive in a single element

### *ngFor

Syntax:

```
*ngFor="let <var> of <array>"
```

### *ngIf

Syntax:

```
*ngIf="<boolean_expression>"
```

## How to create a directive?

1. Create a file and export a class within it (BasicHighlightDirective)
2. Decorate the class with **@Directive**
    * selector - unique id for the directive, this will be the name of the argument in the HTML element

```
@Directive({
  selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective {
}
```

> NOTE: Selector can have the same values as the component's selector: elementSelector, [attributeSelector], .classSelector

3. Inject (through constructor) the element the directive sits on into the directive:

```
constructor(private element: ElementRef) {}
```

4. Perform directive logic in **ngOnInit()** method:

```
ngOnInit() {
    this.element.nativeElement.style.backgroundColor = 'yellow';
}
```

5. Add the directive to the module within which we want to use it (**declarations** attribute)

```
@NgModule({
  declarations: [
    ...,
    BasicHighlightDirective
  ],
})
export class AppModule { }
```

6. Add directive to the HTML element:

```
<p appBasicHighlight>
    Style me with basic directive
</p>
```

### Renderer2 - Accessing element (Recommended way)

```
constructor(private elRef: ElementRef, private renderer: Renderer2) {}
```

* Helper class that changes the style of a HTML element
* Renderer2 has useful method to work with the DOM element
* Why better solution?
    * Angular may not always run in the browser
    * Sometime Angular works with a workers
    * DOM elements must not be available in all environments
* https://angular.io/api/core/Renderer2

Example:

```
ngOnInit() {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
}
```

### Using HostListener to listen to Host Events

We want to invoke the directive action only when some event happened.

1. Create a method within the component

```
mouseover(eventData: Event) {

}
```

2. Decorate the method with the **@HostListener** which takes as an argument the name of the event the handler should be invoked for:

```
@HostListener('mouseenter')
```

3. Implement logic within the method body

### @HostBinding - binds the property of the host element

1. Create a property in the directive
2. Decorate the property with the **@HostBinding** which takes as an argument the name of the property of the host element that should be bind with the directive

```
@HostBinding('style.backgroundColor')
private backgroundColor: string;
```

3. Set the initial value of the property (otherwise an error occurs):

```
@HostBinding('style.backgroundColor')
private backgroundColor: string = 'transparent';
```

4. Use it in the business logic


## Binding to Directive Properties

1. Create an Input properties (just as for the component)

```
@Input()
private defaultColor: string = 'transparent';

@Input()
private highlightColor: string = 'lightblue';
```

2. Add properties to the default directive:

```
<p  appBetterHighlight
    [defaultColor]="'lightyellow'"
    [highlightColor]="'red'">
        Style me with better directive
</p>
```

> IMPORTANT: We are passing a String into the attribute [highlightColor]="**'red'**"

3. If you have just one property to bind, then may provide an alias for the an input that matches the name of the directive:

```
@Input('appBetterHighlight')
highlightColor: string = 'lightblue';
```

## What happens behind the scenes on Structural Directives?

Angular transforms them to something else:

```
<ng-template [ngIf]="!onlyOdd">
  <span>
    <li class="list-group-item"
        [ngClass]="{ even: number % 2 === 0 }"
        *ngFor="let number of evenNumbers">
      {{number}}
    </li>
  </span>
</ng-template>
```

* Angular translates the structural directive (*) to the ngTemplate with a simple binding for the structural directive.

## Building a Structural Directive

1. Create new file with the exported class annotated with **@Directive**

```
@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {

  constructor() { }

}
```

2. (Optional) Create an input property:

> IMPORTANT: We want to execute the method whenever attribute changes so we need to use **set** keyword on the **METHOD** (set keyword is the setter for the property)

```
@Input()
set unless(condition: boolean) {
    if(!condition) {
        // TODO: display
    } else {
        // TODO do not display
    }
}
```

3. Get access to the **ng-template** component that the directive will reside on (after transformation) and access to the place where DOM element should be injected:
    * templateRef: TemplateRef<T> - what should be displayed
    * viewContainerRef: ViewContainerRef - where should be displayed

```
constructor(private template: TemplateRef<any>,
            private container: ViewContainerRef) {
}
```

4. Perform the logic of the structural directive:
    * createEmbeddedView - add template to the DOM
    * clear - clear particular DOM element

```
@Input()
set unless(condition: boolean) {
    if (!condition) {
      this.container.createEmbeddedView(this.template);
    } else {
      this.container.clear();
    }
}
```

5. Add alias for the input that matches the directive name:

```
@Input('appUnless')
```

6. Add directive to the template element:

```
<span *appUnless="onlyOdd">
  <li class="list-group-item"
      [ngClass]="{ even: number % 2 === 0 }"
      *ngFor="let number of evenNumbers">
    {{number}}
  </li>
</span>
```

## ngSwitch

```
<div [ngSwitch]="">
    <p *ngSwitchCase="5">Value is 5</p>
    <p *ngSwitchCase="10">Value is 10</p>
    <p *ngSwitchCase="100">Value is 100</p>
    <p *ngSwitchDefault>Value is default</p>
</div>
```

## How to attach to custom host element class?

This binds to the "open" class of the host element

```
@HostBinding('class.open')
private isOpen = false;
```