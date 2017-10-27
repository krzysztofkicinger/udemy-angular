import {FormControl} from "@angular/forms";

export default class CustomValidators {

  private static FORBIDDEN_USERNAMES = [ 'Chris', 'Anna' ];

  static forbiddenUsernames({ value } : FormControl) : { [s: string]: boolean } {
    if(CustomValidators.isForbiddenUsername(value)) {
      return {
        'nameIsForbidden': true
      }
    }
    return null;
  }

  static isForbiddenUsername(name: string) : boolean {
    return CustomValidators.FORBIDDEN_USERNAMES.indexOf(name) >= 0;
  }

}
