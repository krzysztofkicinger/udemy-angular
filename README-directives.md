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

