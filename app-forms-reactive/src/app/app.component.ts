import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import CustomValidators from './validators/custom.validator';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  genders = ['male', 'female'];
  signupForm: FormGroup;

  // To be sure that this property will not be destroyed during minification, embrace it within quotes
  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, CustomValidators.forbiddenUsernames]),
        'email': new FormControl(null, [Validators.required, Validators.email], [ this.forbiddenEmails.bind(this) ]),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    // this.signupForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // )

    this.signupForm.statusChanges.subscribe(
      (status) => console.log(status)
    )
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  onAddHobbies() {
    const control = new FormControl(null, Validators.required);
    (<FormArray> this.signupForm.get('hobbies')).push(control);
  }


  forbiddenEmails({value}: FormControl): Promise<any> | Observable<any> {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (value === 'test@test.com') {
          resolve({
            'emailIsForbidden': true
          });
        }
        resolve(null)
      }, 1500)
    )
  }

}
