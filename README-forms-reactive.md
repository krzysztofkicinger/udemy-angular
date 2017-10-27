# Forms - Reactive Approach

## How to create a Reactive Form?

1. Enable Reactive Form creation by importing **ReactiveFormsModule** to the **@NgModule**:

```typescript
@NgModule({
  imports: [
    ...,
    ReactiveFormsModule
  ]
})
export class AppModule {
}
```

2. Create a programmatic HTML's Form representation:
    * The root is always the FormGroup
    * It can contain FormGroup(s) and/or FormControl(s)
    * new FormControl(defaultValue, validators, asyncValidators)
    * Object's keys are embraced in quotes to prevent destruction during minimization


```typescript
signupForm: FormGroup;

ngOnInit() {
    this.signupForm = new FormGroup({
      'username': new FormControl(null),
      'email': new FormControl(null),
      'gender' : new FormControl('male')
    });
}
```

3. Attach a HTML form with created form:

```html
<form [formGroup]="signupForm">
```

4. Attach inputs with ones defined in the created form:

```
<input
            type="text"
            id="username"
            class="form-control"
            formControlName="username">
```

Possible solutions:
* Use the key of the FormGroup object property
* Use the data binding with a String that matches the key of the FormGroup object property

```
formControlName="username"
[formControlName]="'username'"
```

## How to submit the form?

1. Create a handler method in the component - this method will use the **signUp** form.

```
onSubmit() {
    console.log(this.signupForm);
}
```

2. Create event binding at the \<form> element:

```
<form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
```

## How to add validation?

FormGroup and FormControl constructors takes as the second argument the Validators array and as the third argument the AsyncValidators array. In order to enable validation pass validators to them.

```
'username': new FormControl(null, [ Validators.required ]),
'email': new FormControl(null, [ Validators.required, Validators.email ]),
```

## How to get access to Controls?

Problem: We want to add custom message to the field when it is not valid.

The FormGroup provides the **get(path)** method. Path represents the structure of the form object's keys.

```
<span
    *ngIf="signupForm.get('username').invalid && signupForm.get('username').touched"
    class="help-block">
    Please enter a valid username!
</span>
```

This also can test entire form:

```
<span
    *ngIf="signupForm.invalid && signupForm.touched"
    class="help-block">
    Please enter a valid data!
</span>
```

## How to group Controls?

1. Create grouped structure of form:

2. Reflect structure in the HTML template using **get** method
    * Get the nested FormGroup: signupForm.get('userData')
    * Update any paths that gets Control from nested group: signupForm.get('userData.username')

```html
<form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
    <div [formGroup]="signupForm.get('userData')">
        <div class="form-group">
            <label for="username">Username</label>
            <input
                type="text"
                id="username"
                class="form-control"
                formControlName="username">
            <span
                *ngIf="signupForm.get('userData.username').invalid && signupForm.get('userData.username').touched"
                class="help-block">
                Please enter a valid username!
            </span>
        </div>
        ...
    </div>
    ...
</form>
```

## How to use FormArray?

FormArray - a placeholder for 0 or more Controls

1. Add an **FormArray** in the created form

```
ngOnInit() {
    this.signupForm = new FormGroup({
      ...,
      'hobbies' : new FormArray([])
    });
}
```

2. Create an event handler for adding some control elements to that array:

```
onAddHobbies() {
    const control = new FormControl(null, Validators.required);
    (<FormArray> this.signupForm.get('hobbies')).push(control);
}
```

3. Synchronize with HTML using **formArrayName**:

```
<div formArrayName="hobbies">...</div>
```

4. Select all form controls currently stored in the array
    * To get controls stored in the array use **signupForm.get('hobbies').controls**
    * Also access index value: **let i = index**
    * When creating dynamically parts of the form the name of the input is not set. We can differentiate inputs by setting index of the array as the **formControlName**


```
<div
    class="form-group"
    *ngFor="let hobbyControl of signupForm.get('hobbies').controls; let i = index">
    <input type="text" class="form-control" [formControlName]="i">
</div>
```

## How to create custom validators?

Validators are just functions that takes a parameter FormControl.

1. Create a validator (function)

```
forbiddenUsernames({ value } : FormControl) : { [s: string]: boolean } {
    if(isForbiddenUsername(value)) {
      return {
        'nameIsForbidden': true
      }
    }
    return null;
}
```

Validator must return:
* Object with keys that represents the error and a boolean set to true (it doesn't matter if it is true or false, cause Angular checks the presence of key-value pair)
* **null** if no error was found

2. Pass this validator in the validators array:

```
'username': new FormControl(null, [ Validators.required, this.forbiddenUsernames.bind(this) ]),
```

Binding is required, cause Angular internals calls this method when required.

## How to use error codes?

Angular adds validation result errors on the individual controls/objects.

```
<span *ngIf="signupForm.get('userData.username').errors['required']">Please enter a username!</span>
<span *ngIf="signupForm.get('userData.username').errors['nameIsForbidden']">Please enter another username!</span>
```

## How to create custom asynchronous validators?

