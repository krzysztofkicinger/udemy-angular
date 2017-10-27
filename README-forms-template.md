# Forms

## Template-Driven vs Reactive Approach

**Template-Driven Forms**

* Angular infers the Form Object from the DOM
* Form is defined in the HTML template

**Reactive Forms**

* More Complex
* Form structure is defined in the TS
* HTML code is set up
* We have to manually combine form structure with the HTML code
* Form is created programmatically and synchronized with the DOM

# Forms - Template-Driven Approach

## How to create the Form and register the Controls?

1. Add **FormsModule** to the **@NgModule**

```
@NgModule({
  imports: [
    FormsModule
  ],
  ...
})
export class AppModule { }
```

2. Angular will automatically create a representation of the form when it finds the \<form> tag within the component but does not find automatically \<input>(s)
3. Add to input **ngModel** directive (but WITHOUT two-way binding):

```
<div class="form-group">
    <label for="username">Username</label>
    <input
        ...
        ngModel>
</div>
```

4. Add the input **name** attribute that will be used as the name of the Control:

```
<div class="form-group">
    <label for="username">Username</label>
    <input
        ...
        ngModel
        name="username">
</div>
```

This will provide the Angular with all the information required for registering the input as a Control.

## How to submit and use form?

1. Create in the component the **onSubmit** method:

```
export class AppComponent {

  onSubmit() {

  }

}
```

2. Bind the submit action with the action created in the previous step:

```
<form (ngSubmit)="onSubmit()">
```

3. Create a local reference to the **ngForm** object (automatically created by Angular) and pass it to the **onSubmit** method:

```
<form (ngSubmit)="onSubmit(form)" #form="ngForm">
```

4. Change the signature of the **onSubmit** method and accept the **NgForm** parameter:

```
onSubmit(form: NgForm) {
    console.log(form);
}
```


## Understanding form state

This are all properties of the NgFrom object:

* **controls** - object that contains all defined FormControl(s) that where defined in the form

> NOTE: Each FormControl object has a lot properties mostly the same as the NgForm

* **dirty** - if something has been changed in the form
* **disabled** -if the form was disabled for some reason
* **invalid** - is the form valid or not
* **touched** - if the field was touched

> NOTE: Difference between **dirty** and **touched** is based on the change of the value of the field. **touched** means that focus the field and **dirty** means that we've changed the value of the field.

## How to access the form using @ViewChild

1. Create a local reference (the same as above)
2. Create a property in the component:

```typescript
@ViewChild('form')
private form: NgForm;
```

## How to use built-in validation to check user input?

You can validate Form (Controls) using default HTML validators as long as custom validators.

* Build in Angular validators can be found:
    * https://angular.io/api/forms/Validators
    * https://angular.io/api?type=directive
* Additionally, you might also want to enable HTML5 validation (by default, Angular disables it). You can do so by adding the **ngNativeValidate**  to a control in your template.

1. Disable the submit button if the form is invalid:

```
<button type="submit" [disabled]="form.invalid">Submit</button>
```

2. Add some styling for classes added by Angular:
* ng-pristine / ng-dirty
* ng-untouched / ng-touched
* ng-valid / ng-invalid

```
input.ng-invalid.ng-touched,
select.ng-invalid.ng-touched {
    border: 1px solid red;
}
```

3. Provide some message for invalid fields:

    1. Create a local reference to the input element and set it to **ngModel**. This exposes some additional properties.

    ```
    <input
                  ngModel
                  name="email"
                  required
                  email
                  #email="ngModel">
    ```

    2. Use **ngIf** to show the message or not

    ```
    <span class="help-block" *ngIf="email.invalid && email.touched">Please enter a valid email!</span>
    ```

## How to set default values with ngModel property binding?

```
<select
    id="secret"
    class="form-control"
    [ngModel]="defaultQuestion"
    name="secret">
        <option value="pet">Your first Pet?</option>
        <option value="teacher">Your first teacher?</option>
</select>
```

## How to use ngModel with the Two-way Binding?

Use Case: Instantly react to some changes of the value

1. Add **[(ngModel)]** to the element:

```
<div class="form-group">
    <textarea
        class="form-control"
        name="questionAnswer"
        rows="3"
        [(ngModel)]="answer">
    </textarea>
</div>
```

2. Create a property in the component
3. Use variable in the template:

```
<p>Your reply: {{ answer }}</p>
```

## Three forms of ngModel**

* **ngModel** (no binding) - just tells Angular that input is a Control
* **\[ngModel]** (one-way binding) - give that Control a default value
* **\[(ngModel)]** (two-way binding) - automatically update the value with each change

## How to group Form Controls?

Create a wrapping element and add an **ngModelGroup** directive to it

```html
<div id="user-data" ngModelGroup="user-data">
    FORM CONTROLS...
</div>
```

The value passed to **ngModelGroup** is the name of the group.

It also has all extra properties provided by Angular:

```
<div id="user-data"
     ngModelGroup="user-data"
     #userData="ngModelGroup">
```

```
<p *ngIf="userData.invalid && userData.touched">Enter correct user data.</p>
```


## How to handle Radio Buttons?


