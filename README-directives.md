# Directives

## Attribute Directives

* Set on elements just like attributes
* Changes the properties of the DOM's element, but not creates or removes DOM elements
* Look like a normal HTML Attribute (possibly with databinding or event binding)
* Only affect/change the element they are added to

## Structural Directives

* Set on elements just like attributes (the same as Attribute) but also changes the DOM structure around this element
* Look like a normal HTML Attribute but have a leading * (for desugaring)
* Affect a whole area in the DOM (elements get added/removed)

### *ngFor

Syntax:

```
*ngFor="let <var> of <array>"
```